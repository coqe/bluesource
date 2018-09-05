package com.coqe.bluesource.service.impl;

import com.coqe.bluesource.service.UserProfileService;
import com.coqe.bluesource.domain.UserProfile;
import com.coqe.bluesource.repository.UserProfileRepository;
import com.coqe.bluesource.repository.search.UserProfileSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing UserProfile.
 */
@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileServiceImpl.class);

    private final UserProfileRepository userProfileRepository;

    private final UserProfileSearchRepository userProfileSearchRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository, UserProfileSearchRepository userProfileSearchRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userProfileSearchRepository = userProfileSearchRepository;
    }

    /**
     * Save a userProfile.
     *
     * @param userProfile the entity to save
     * @return the persisted entity
     */
    @Override
    public UserProfile save(UserProfile userProfile) {
        log.debug("Request to save UserProfile : {}", userProfile);        UserProfile result = userProfileRepository.save(userProfile);
        userProfileSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the userProfiles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserProfile> findAll() {
        log.debug("Request to get all UserProfiles");
        return userProfileRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the UserProfile with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<UserProfile> findAllWithEagerRelationships(Pageable pageable) {
        return userProfileRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserProfile> findOne(Long id) {
        log.debug("Request to get UserProfile : {}", id);
        return userProfileRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the userProfile by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserProfile : {}", id);
        userProfileRepository.deleteById(id);
        userProfileSearchRepository.deleteById(id);
    }

    /**
     * Search for the userProfile corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserProfile> search(String query) {
        log.debug("Request to search UserProfiles for query {}", query);
        return StreamSupport
            .stream(userProfileSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
