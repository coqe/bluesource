package com.coqe.bluesource.repository.search;

import com.coqe.bluesource.domain.Comment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Comment entity.
 */
public interface CommentSearchRepository extends ElasticsearchRepository<Comment, Long> {
}
