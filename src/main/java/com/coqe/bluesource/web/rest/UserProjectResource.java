package com.coqe.bluesource.web.rest;


import java.util.List;
import java.util.Optional;

import io.micrometer.core.annotation.Timed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coqe.bluesource.domain.Project;
import com.coqe.bluesource.domain.UserProfile;
import com.coqe.bluesource.service.ProjectService;
import com.coqe.bluesource.service.UserProfileService;

@RestController
@RequestMapping("/api/user-profiles/{id}")
public class UserProjectResource {
    
    private final Logger log = LoggerFactory.getLogger(UserProfileResource.class);
    
    private final UserProfileService userProfileService;
    private final ProjectService projectService;
    
    public UserProjectResource(UserProfileService userProfileService, ProjectService projectService) {
        this.userProfileService = userProfileService;
        this.projectService = projectService;
    }

    @Timed
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getUserProfileProjects(@PathVariable Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        Optional<UserProfile> userProfile = userProfileService.findOne(id);
        if(userProfile.isPresent()){
            return ResponseEntity.ok(projectService.findAllByUsersSkills(userProfile.get()));
        }
        return ResponseEntity.notFound().build();
    }
}
