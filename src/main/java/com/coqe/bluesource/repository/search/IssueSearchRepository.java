package com.coqe.bluesource.repository.search;

import com.coqe.bluesource.domain.Issue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Issue entity.
 */
public interface IssueSearchRepository extends ElasticsearchRepository<Issue, Long> {
}
