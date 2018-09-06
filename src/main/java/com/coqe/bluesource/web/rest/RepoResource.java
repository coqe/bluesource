package com.coqe.bluesource.web.rest;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import io.github.jhipster.web.util.ResponseUtil;

import org.kohsuke.github.GHRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.coqe.bluesource.domain.Repo;
import com.coqe.bluesource.repomanager.ExternalRepo;
import com.coqe.bluesource.repomanager.GitHubRepo;
import com.coqe.bluesource.repomanager.GitHubRepoDetails;
import com.coqe.bluesource.repomanager.RepoDetailsDto;
import com.coqe.bluesource.service.RepoService;
import com.coqe.bluesource.web.rest.errors.BadRequestAlertException;
import com.coqe.bluesource.web.rest.util.HeaderUtil;

/**
 * REST controller for managing ExternalRepo.
 */
@RestController
@RequestMapping("/api")
public class RepoResource {

    private final Logger log = LoggerFactory.getLogger(RepoResource.class);

    private static final String ENTITY_NAME = "repo";

    private final RepoService repoService;

    public RepoResource(RepoService repoService) {
        this.repoService = repoService;
    }

    /**
     * POST  /repos : Create a new repo.
     *
     * @param repo the repo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repo, or with status 400 (Bad Request) if the repo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repos")
    @Timed
    public ResponseEntity<Repo> createRepo(@Valid @RequestBody Repo repo) throws URISyntaxException {
        log.debug("REST request to save ExternalRepo : {}", repo);
        if (repo.getId() != null) {
            throw new BadRequestAlertException("A new repo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Repo result = repoService.save(repo);
        return ResponseEntity.created(new URI("/api/repos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repos : Updates an existing repo.
     *
     * @param repo the repo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repo,
     * or with status 400 (Bad Request) if the repo is not valid,
     * or with status 500 (Internal Server Error) if the repo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repos")
    @Timed
    public ResponseEntity<Repo> updateRepo(@Valid @RequestBody Repo repo) throws URISyntaxException {
        log.debug("REST request to update ExternalRepo : {}", repo);
        if (repo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Repo result = repoService.save(repo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repos : get all the repos.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of repos in body
     */
    @GetMapping("/repos")
    @Timed
    public List<Repo> getAllRepos(@RequestParam(required = false) String filter) {
        if ("project-is-null".equals(filter)) {
            log.debug("REST request to get all Repos where project is null");
            return repoService.findAllWhereProjectIsNull();
        }
        log.debug("REST request to get all Repos");
        return repoService.findAll();
    }

    /**
     * GET  /repos/:id : get the "id" repo.
     *
     * @param id the id of the repo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repo, or with status 404 (Not Found)
     */
    @GetMapping("/repos/{id}")
    @Timed
    public ResponseEntity<Repo> getRepo(@PathVariable Long id) {
        log.debug("REST request to get ExternalRepo : {}", id);
        Optional<Repo> repo = repoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repo);
    }

    /**
     * DELETE  /repos/:id : delete the "id" repo.
     *
     * @param id the id of the repo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repos/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepo(@PathVariable Long id) {
        log.debug("REST request to delete ExternalRepo : {}", id);
        repoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/repos?query=:query : search for the repo corresponding
     * to the query.
     *
     * @param query the query of the repo search
     * @return the result of the search
     */
    @GetMapping("/_search/repos")
    @Timed
    public List<Repo> searchRepos(@RequestParam String query) {
        log.debug("REST request to search Repos for query {}", query);
        return repoService.search(query);
    }
    
    @GetMapping("/repos/github")
    @Timed
    public RepoDetailsDto checkGithub(@RequestParam String githubUri){
        ExternalRepo<GHRepository> ghr = GitHubRepo.findRepo(githubUri);
        return new GitHubRepoDetails().toRepoDetailsDto((GitHubRepo) ghr);
    }

}
