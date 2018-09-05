package com.coqe.bluesource.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of KeywordSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class KeywordSearchRepositoryMockConfiguration {

    @MockBean
    private KeywordSearchRepository mockKeywordSearchRepository;

}
