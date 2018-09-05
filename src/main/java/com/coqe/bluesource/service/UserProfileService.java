package com.coqe.bluesource.service;

import com.coqe.bluesource.domain.UserProfile;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing UserProfile.
 */
public interface UserProfileService {

    /**
     * Save a userProfile.
     *
     * @param userProfile the entity to save
     * @return the persisted entity
     */
    UserProfile save(UserProfile userProfile);

    /**
     * Get all the userProfiles.
     *
     * @return the list of entities
     */
    List<UserProfile> findAll();

    /**
     * Get all the UserProfile with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<UserProfile> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" userProfile.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UserProfile> findOne(Long id);

    /**
     * Delete the "id" userProfile.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the userProfile corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<UserProfile> search(String query);
}
