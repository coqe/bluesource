package com.coqe.bluesource.service;

import java.util.List;
import java.util.Optional;

import com.coqe.bluesource.domain.Repo;

/**
 * Service Interface for managing ExternalRepo.
 */
public interface RepoService {

    /**
     * Save a repo.
     *
     * @param repo the entity to save
     * @return the persisted entity
     */
    Repo save(Repo repo);

    /**
     * Get all the repos.
     *
     * @return the list of entities
     */
    List<Repo> findAll();
    /**
     * Get all the RepoDTO where Project is null.
     *
     * @return the list of entities
     */
    List<Repo> findAllWhereProjectIsNull();


    /**
     * Get the "id" repo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Repo> findOne(Long id);

    /**
     * Delete the "id" repo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the repo corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Repo> search(String query);
}
