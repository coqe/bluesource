package com.coqe.bluesource.service.impl;

import com.coqe.bluesource.service.KeywordService;
import com.coqe.bluesource.domain.Keyword;
import com.coqe.bluesource.repository.KeywordRepository;
import com.coqe.bluesource.repository.search.KeywordSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Keyword.
 */
@Service
@Transactional
public class KeywordServiceImpl implements KeywordService {

    private final Logger log = LoggerFactory.getLogger(KeywordServiceImpl.class);

    private final KeywordRepository keywordRepository;

    private final KeywordSearchRepository keywordSearchRepository;

    public KeywordServiceImpl(KeywordRepository keywordRepository, KeywordSearchRepository keywordSearchRepository) {
        this.keywordRepository = keywordRepository;
        this.keywordSearchRepository = keywordSearchRepository;
    }

    /**
     * Save a keyword.
     *
     * @param keyword the entity to save
     * @return the persisted entity
     */
    @Override
    public Keyword save(Keyword keyword) {
        log.debug("Request to save Keyword : {}", keyword);        Keyword result = keywordRepository.save(keyword);
        keywordSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the keywords.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Keyword> findAll() {
        log.debug("Request to get all Keywords");
        return keywordRepository.findAll();
    }


    /**
     * Get one keyword by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Keyword> findOne(Long id) {
        log.debug("Request to get Keyword : {}", id);
        return keywordRepository.findById(id);
    }

    /**
     * Delete the keyword by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Keyword : {}", id);
        keywordRepository.deleteById(id);
        keywordSearchRepository.deleteById(id);
    }

    /**
     * Search for the keyword corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Keyword> search(String query) {
        log.debug("Request to search Keywords for query {}", query);
        return StreamSupport
            .stream(keywordSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
