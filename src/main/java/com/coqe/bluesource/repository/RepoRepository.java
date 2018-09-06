package com.coqe.bluesource.repository;

import com.coqe.bluesource.domain.Repo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExternalRepo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepoRepository extends JpaRepository<Repo, Long> {

}
