package com.coqe.bluesource.service;

import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codahale.metrics.annotation.Timed;
import com.coqe.bluesource.domain.Comment;
import com.coqe.bluesource.domain.Issue;
import com.coqe.bluesource.domain.Keyword;
import com.coqe.bluesource.domain.Project;
import com.coqe.bluesource.domain.Repo;
import com.coqe.bluesource.domain.User;
import com.coqe.bluesource.domain.UserProfile;
import com.coqe.bluesource.repository.CommentRepository;
import com.coqe.bluesource.repository.IssueRepository;
import com.coqe.bluesource.repository.KeywordRepository;
import com.coqe.bluesource.repository.ProjectRepository;
import com.coqe.bluesource.repository.RepoRepository;
import com.coqe.bluesource.repository.UserProfileRepository;
import com.coqe.bluesource.repository.UserRepository;
import com.coqe.bluesource.repository.search.CommentSearchRepository;
import com.coqe.bluesource.repository.search.IssueSearchRepository;
import com.coqe.bluesource.repository.search.KeywordSearchRepository;
import com.coqe.bluesource.repository.search.ProjectSearchRepository;
import com.coqe.bluesource.repository.search.RepoSearchRepository;
import com.coqe.bluesource.repository.search.UserProfileSearchRepository;
import com.coqe.bluesource.repository.search.UserSearchRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final CommentRepository commentRepository;

    private final CommentSearchRepository commentSearchRepository;

    private final IssueRepository issueRepository;

    private final IssueSearchRepository issueSearchRepository;

    private final KeywordRepository keywordRepository;

    private final KeywordSearchRepository keywordSearchRepository;

    private final ProjectRepository projectRepository;

    private final ProjectSearchRepository projectSearchRepository;

    private final RepoRepository repoRepository;

    private final RepoSearchRepository repoSearchRepository;

    private final UserProfileRepository userProfileRepository;

    private final UserProfileSearchRepository userProfileSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        CommentRepository commentRepository,
        CommentSearchRepository commentSearchRepository,
        IssueRepository issueRepository,
        IssueSearchRepository issueSearchRepository,
        KeywordRepository keywordRepository,
        KeywordSearchRepository keywordSearchRepository,
        ProjectRepository projectRepository,
        ProjectSearchRepository projectSearchRepository,
        RepoRepository repoRepository,
        RepoSearchRepository repoSearchRepository,
        UserProfileRepository userProfileRepository,
        UserProfileSearchRepository userProfileSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.commentRepository = commentRepository;
        this.commentSearchRepository = commentSearchRepository;
        this.issueRepository = issueRepository;
        this.issueSearchRepository = issueSearchRepository;
        this.keywordRepository = keywordRepository;
        this.keywordSearchRepository = keywordSearchRepository;
        this.projectRepository = projectRepository;
        this.projectSearchRepository = projectSearchRepository;
        this.repoRepository = repoRepository;
        this.repoSearchRepository = repoSearchRepository;
        this.userProfileRepository = userProfileRepository;
        this.userProfileSearchRepository = userProfileSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(Comment.class, commentRepository, commentSearchRepository);
                reindexForClass(Issue.class, issueRepository, issueSearchRepository);
                reindexForClass(Keyword.class, keywordRepository, keywordSearchRepository);
                reindexForClass(Project.class, projectRepository, projectSearchRepository);
                reindexForClass(Repo.class, repoRepository, repoSearchRepository);
                reindexForClass(UserProfile.class, userProfileRepository, userProfileSearchRepository);
                reindexForClass(User.class, userRepository, userSearchRepository);

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (Exception e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
                Pageable page = new PageRequest(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.saveAll(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
