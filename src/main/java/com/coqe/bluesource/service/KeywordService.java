package com.coqe.bluesource.service;

import com.coqe.bluesource.domain.Keyword;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Keyword.
 */
public interface KeywordService {

    /**
     * Save a keyword.
     *
     * @param keyword the entity to save
     * @return the persisted entity
     */
    Keyword save(Keyword keyword);

    /**
     * Get all the keywords.
     *
     * @return the list of entities
     */
    List<Keyword> findAll();


    /**
     * Get the "id" keyword.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Keyword> findOne(Long id);

    /**
     * Delete the "id" keyword.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the keyword corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Keyword> search(String query);
}
