package com.coqe.bluesource.web.rest;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coqe.bluesource.service.ProjectService;
import com.coqe.bluesource.service.UserProfileService;

@RestController
@RequestMapping("/api/user-profiles/{id}")
public class UserProjectResource {
    
    
    private final Logger log = LoggerFactory.getLogger(UserProfileResource.class);
    
    private static final String ENTITY_NAME = "userProfile";
    
    private final UserProfileService userProfileService;
    private final ProjectService projectService;
    
    public UserProjectResource(UserProfileService userProfileService, ProjectService projectService) {
        this.userProfileService = userProfileService;
        this.projectService = projectService;
    }
//
//    @Timed
//    public ResponseEntity<List<Project>> getUserProfileProjects(@PathVariable Long id) {
//        log.debug("REST request to get UserProfile : {}", id);
//        Optional<UserProfile> userProjects = userProfileService.findOne(id);
//        if(userProjects.isPresent()){
//            projectService.findAllByUsersSkills(userProjects.)
//        }
//        return ResponseUtil.wrapOrNotFound(userProfile);
//    }
}
