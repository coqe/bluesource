package com.coqe.bluesource.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coqe.bluesource.domain.Repo;
import com.coqe.bluesource.repository.RepoRepository;
import com.coqe.bluesource.repository.search.RepoSearchRepository;
import com.coqe.bluesource.service.RepoService;

/**
 * Service Implementation for managing ExternalRepo.
 */
@Service
@Transactional
public class RepoServiceImpl implements RepoService {

    private final Logger log = LoggerFactory.getLogger(RepoServiceImpl.class);

    private final RepoRepository repoRepository;

    private final RepoSearchRepository repoSearchRepository;

    public RepoServiceImpl(RepoRepository repoRepository, RepoSearchRepository repoSearchRepository) {
        this.repoRepository = repoRepository;
        this.repoSearchRepository = repoSearchRepository;
    }

    /**
     * Save a repo.
     *
     * @param repo the entity to save
     * @return the persisted entity
     */
    @Override
    public Repo save(Repo repo) {
        log.debug("Request to save ExternalRepo : {}", repo);        Repo result = repoRepository.save(repo);
        
        
        repoSearchRepository.save(result);
        
        
        return result;
    }

    /**
     * Get all the repos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Repo> findAll() {
        log.debug("Request to get all Repos");
        return repoRepository.findAll();
    }



    /**
     *  get all the repos where Project is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Repo> findAllWhereProjectIsNull() {
        log.debug("Request to get all repos where Project is null");
        return StreamSupport
            .stream(repoRepository.findAll().spliterator(), false)
            .filter(repo -> repo.getProject() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one repo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Repo> findOne(Long id) {
        log.debug("Request to get ExternalRepo : {}", id);
        return repoRepository.findById(id);
    }

    /**
     * Delete the repo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExternalRepo : {}", id);
        repoRepository.deleteById(id);
        repoSearchRepository.deleteById(id);
    }

    /**
     * Search for the repo corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Repo> search(String query) {
        log.debug("Request to search Repos for query {}", query);
        return StreamSupport
            .stream(repoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
