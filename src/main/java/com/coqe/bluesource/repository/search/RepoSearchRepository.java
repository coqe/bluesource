package com.coqe.bluesource.repository.search;

import com.coqe.bluesource.domain.Repo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ExternalRepo entity.
 */
public interface RepoSearchRepository extends ElasticsearchRepository<Repo, Long> {
}
