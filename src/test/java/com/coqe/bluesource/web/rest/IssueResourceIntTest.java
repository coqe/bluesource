package com.coqe.bluesource.web.rest;

import com.coqe.bluesource.BluesourceApp;

import com.coqe.bluesource.domain.Issue;
import com.coqe.bluesource.repository.IssueRepository;
import com.coqe.bluesource.repository.search.IssueSearchRepository;
import com.coqe.bluesource.service.IssueService;
import com.coqe.bluesource.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.coqe.bluesource.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IssueResource REST controller.
 *
 * @see IssueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BluesourceApp.class)
public class IssueResourceIntTest {

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_FULL_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_FULL_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INTEREST = 1;
    private static final Integer UPDATED_INTEREST = 2;

    private static final Integer DEFAULT_REWARDS = 0;
    private static final Integer UPDATED_REWARDS = 1;

    @Autowired
    private IssueRepository issueRepository;

    

    @Autowired
    private IssueService issueService;

    /**
     * This repository is mocked in the com.coqe.bluesource.repository.search test package.
     *
     * @see com.coqe.bluesource.repository.search.IssueSearchRepositoryMockConfiguration
     */
    @Autowired
    private IssueSearchRepository mockIssueSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIssueMockMvc;

    private Issue issue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IssueResource issueResource = new IssueResource(issueService);
        this.restIssueMockMvc = MockMvcBuilders.standaloneSetup(issueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Issue createEntity(EntityManager em) {
        Issue issue = new Issue()
            .summary(DEFAULT_SUMMARY)
            .fullDescription(DEFAULT_FULL_DESCRIPTION)
            .interest(DEFAULT_INTEREST)
            .rewards(DEFAULT_REWARDS);
        return issue;
    }

    @Before
    public void initTest() {
        issue = createEntity(em);
    }

    @Test
    @Transactional
    public void createIssue() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();

        // Create the Issue
        restIssueMockMvc.perform(post("/api/issues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isCreated());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate + 1);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testIssue.getFullDescription()).isEqualTo(DEFAULT_FULL_DESCRIPTION);
        assertThat(testIssue.getInterest()).isEqualTo(DEFAULT_INTEREST);
        assertThat(testIssue.getRewards()).isEqualTo(DEFAULT_REWARDS);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).save(testIssue);
    }

    @Test
    @Transactional
    public void createIssueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();

        // Create the Issue with an existing ID
        issue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIssueMockMvc.perform(post("/api/issues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(0)).save(issue);
    }

    @Test
    @Transactional
    public void getAllIssues() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get all the issueList
        restIssueMockMvc.perform(get("/api/issues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issue.getId().intValue())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY.toString())))
            .andExpect(jsonPath("$.[*].fullDescription").value(hasItem(DEFAULT_FULL_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].interest").value(hasItem(DEFAULT_INTEREST)))
            .andExpect(jsonPath("$.[*].rewards").value(hasItem(DEFAULT_REWARDS)));
    }
    

    @Test
    @Transactional
    public void getIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", issue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(issue.getId().intValue()))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY.toString()))
            .andExpect(jsonPath("$.fullDescription").value(DEFAULT_FULL_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.interest").value(DEFAULT_INTEREST))
            .andExpect(jsonPath("$.rewards").value(DEFAULT_REWARDS));
    }
    @Test
    @Transactional
    public void getNonExistingIssue() throws Exception {
        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIssue() throws Exception {
        // Initialize the database
        issueService.save(issue);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockIssueSearchRepository);

        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // Update the issue
        Issue updatedIssue = issueRepository.findById(issue.getId()).get();
        // Disconnect from session so that the updates on updatedIssue are not directly saved in db
        em.detach(updatedIssue);
        updatedIssue
            .summary(UPDATED_SUMMARY)
            .fullDescription(UPDATED_FULL_DESCRIPTION)
            .interest(UPDATED_INTEREST)
            .rewards(UPDATED_REWARDS);

        restIssueMockMvc.perform(put("/api/issues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIssue)))
            .andExpect(status().isOk());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testIssue.getFullDescription()).isEqualTo(UPDATED_FULL_DESCRIPTION);
        assertThat(testIssue.getInterest()).isEqualTo(UPDATED_INTEREST);
        assertThat(testIssue.getRewards()).isEqualTo(UPDATED_REWARDS);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).save(testIssue);
    }

    @Test
    @Transactional
    public void updateNonExistingIssue() throws Exception {
        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // Create the Issue

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restIssueMockMvc.perform(put("/api/issues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(0)).save(issue);
    }

    @Test
    @Transactional
    public void deleteIssue() throws Exception {
        // Initialize the database
        issueService.save(issue);

        int databaseSizeBeforeDelete = issueRepository.findAll().size();

        // Get the issue
        restIssueMockMvc.perform(delete("/api/issues/{id}", issue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).deleteById(issue.getId());
    }

    @Test
    @Transactional
    public void searchIssue() throws Exception {
        // Initialize the database
        issueService.save(issue);
        when(mockIssueSearchRepository.search(queryStringQuery("id:" + issue.getId())))
            .thenReturn(Collections.singletonList(issue));
        // Search the issue
        restIssueMockMvc.perform(get("/api/_search/issues?query=id:" + issue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issue.getId().intValue())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY.toString())))
            .andExpect(jsonPath("$.[*].fullDescription").value(hasItem(DEFAULT_FULL_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].interest").value(hasItem(DEFAULT_INTEREST)))
            .andExpect(jsonPath("$.[*].rewards").value(hasItem(DEFAULT_REWARDS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Issue.class);
        Issue issue1 = new Issue();
        issue1.setId(1L);
        Issue issue2 = new Issue();
        issue2.setId(issue1.getId());
        assertThat(issue1).isEqualTo(issue2);
        issue2.setId(2L);
        assertThat(issue1).isNotEqualTo(issue2);
        issue1.setId(null);
        assertThat(issue1).isNotEqualTo(issue2);
    }
}
