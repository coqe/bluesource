package com.coqe.bluesource.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.coqe.bluesource.domain.Issue;
import com.coqe.bluesource.service.IssueService;
import com.coqe.bluesource.web.rest.errors.BadRequestAlertException;
import com.coqe.bluesource.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Issue.
 */
@RestController
@RequestMapping("/api")
public class IssueResource {

    private final Logger log = LoggerFactory.getLogger(IssueResource.class);

    private static final String ENTITY_NAME = "issue";

    private final IssueService issueService;

    public IssueResource(IssueService issueService) {
        this.issueService = issueService;
    }

    /**
     * POST  /issues : Create a new issue.
     *
     * @param issue the issue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new issue, or with status 400 (Bad Request) if the issue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/issues")
    @Timed
    public ResponseEntity<Issue> createIssue(@Valid @RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to save Issue : {}", issue);
        if (issue.getId() != null) {
            throw new BadRequestAlertException("A new issue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Issue result = issueService.save(issue);
        return ResponseEntity.created(new URI("/api/issues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /issues : Updates an existing issue.
     *
     * @param issue the issue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated issue,
     * or with status 400 (Bad Request) if the issue is not valid,
     * or with status 500 (Internal Server Error) if the issue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/issues")
    @Timed
    public ResponseEntity<Issue> updateIssue(@Valid @RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to update Issue : {}", issue);
        if (issue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Issue result = issueService.save(issue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, issue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /issues : get all the issues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of issues in body
     */
    @GetMapping("/issues")
    @Timed
    public List<Issue> getAllIssues() {
        log.debug("REST request to get all Issues");
        return issueService.findAll();
    }

    /**
     * GET  /issues/:id : get the "id" issue.
     *
     * @param id the id of the issue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the issue, or with status 404 (Not Found)
     */
    @GetMapping("/issues/{id}")
    @Timed
    public ResponseEntity<Issue> getIssue(@PathVariable Long id) {
        log.debug("REST request to get Issue : {}", id);
        Optional<Issue> issue = issueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(issue);
    }

    /**
     * DELETE  /issues/:id : delete the "id" issue.
     *
     * @param id the id of the issue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/issues/{id}")
    @Timed
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        log.debug("REST request to delete Issue : {}", id);
        issueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/issues?query=:query : search for the issue corresponding
     * to the query.
     *
     * @param query the query of the issue search
     * @return the result of the search
     */
    @GetMapping("/_search/issues")
    @Timed
    public List<Issue> searchIssues(@RequestParam String query) {
        log.debug("REST request to search Issues for query {}", query);
        return issueService.search(query);
    }

}
