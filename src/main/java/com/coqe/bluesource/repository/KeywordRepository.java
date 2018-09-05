package com.coqe.bluesource.repository;

import com.coqe.bluesource.domain.Keyword;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Keyword entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

}
