package com.coqe.bluesource.repository.search;

import com.coqe.bluesource.domain.Keyword;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Keyword entity.
 */
public interface KeywordSearchRepository extends ElasticsearchRepository<Keyword, Long> {
}
