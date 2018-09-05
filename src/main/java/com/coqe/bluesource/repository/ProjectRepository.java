package com.coqe.bluesource.repository;

import com.coqe.bluesource.domain.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query(value = "select distinct project from Project project left join fetch project.technologies left join fetch project.contributors left join fetch project.admins",
        countQuery = "select count(distinct project) from Project project")
    Page<Project> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct project from Project project left join fetch project.technologies left join fetch project.contributors left join fetch project.admins")
    List<Project> findAllWithEagerRelationships();

    @Query("select project from Project project left join fetch project.technologies left join fetch project.contributors left join fetch project.admins where project.id =:id")
    Optional<Project> findOneWithEagerRelationships(@Param("id") Long id);

}
