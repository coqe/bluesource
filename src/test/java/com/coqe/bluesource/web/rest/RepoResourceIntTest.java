package com.coqe.bluesource.web.rest;

import com.coqe.bluesource.BluesourceApp;

import com.coqe.bluesource.domain.Repo;
import com.coqe.bluesource.repository.RepoRepository;
import com.coqe.bluesource.repository.search.RepoSearchRepository;
import com.coqe.bluesource.service.RepoService;
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
 * Test class for the RepoResource REST controller.
 *
 * @see RepoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BluesourceApp.class)
public class RepoResourceIntTest {

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    @Autowired
    private RepoRepository repoRepository;

    

    @Autowired
    private RepoService repoService;

    /**
     * This repository is mocked in the com.coqe.bluesource.repository.search test package.
     *
     * @see com.coqe.bluesource.repository.search.RepoSearchRepositoryMockConfiguration
     */
    @Autowired
    private RepoSearchRepository mockRepoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRepoMockMvc;

    private Repo repo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepoResource repoResource = new RepoResource(repoService);
        this.restRepoMockMvc = MockMvcBuilders.standaloneSetup(repoResource)
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
    public static Repo createEntity(EntityManager em) {
        Repo repo = new Repo()
            .uri(DEFAULT_URI);
        return repo;
    }

    @Before
    public void initTest() {
        repo = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepo() throws Exception {
        int databaseSizeBeforeCreate = repoRepository.findAll().size();

        // Create the ExternalRepo
        restRepoMockMvc.perform(post("/api/repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repo)))
            .andExpect(status().isCreated());

        // Validate the ExternalRepo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeCreate + 1);
        Repo testRepo = repoList.get(repoList.size() - 1);
        assertThat(testRepo.getUri()).isEqualTo(DEFAULT_URI);

        // Validate the ExternalRepo in Elasticsearch
        verify(mockRepoSearchRepository, times(1)).save(testRepo);
    }

    @Test
    @Transactional
    public void createRepoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repoRepository.findAll().size();

        // Create the ExternalRepo with an existing ID
        repo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepoMockMvc.perform(post("/api/repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repo)))
            .andExpect(status().isBadRequest());

        // Validate the ExternalRepo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeCreate);

        // Validate the ExternalRepo in Elasticsearch
        verify(mockRepoSearchRepository, times(0)).save(repo);
    }

    @Test
    @Transactional
    public void checkUriIsRequired() throws Exception {
        int databaseSizeBeforeTest = repoRepository.findAll().size();
        // set the field null
        repo.setUri(null);

        // Create the ExternalRepo, which fails.

        restRepoMockMvc.perform(post("/api/repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repo)))
            .andExpect(status().isBadRequest());

        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepos() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        // Get all the repoList
        restRepoMockMvc.perform(get("/api/repos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repo.getId().intValue())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())));
    }
    

    @Test
    @Transactional
    public void getRepo() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        // Get the repo
        restRepoMockMvc.perform(get("/api/repos/{id}", repo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repo.getId().intValue()))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRepo() throws Exception {
        // Get the repo
        restRepoMockMvc.perform(get("/api/repos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepo() throws Exception {
        // Initialize the database
        repoService.save(repo);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockRepoSearchRepository);

        int databaseSizeBeforeUpdate = repoRepository.findAll().size();

        // Update the repo
        Repo updatedRepo = repoRepository.findById(repo.getId()).get();
        // Disconnect from session so that the updates on updatedRepo are not directly saved in db
        em.detach(updatedRepo);
        updatedRepo
            .uri(UPDATED_URI);

        restRepoMockMvc.perform(put("/api/repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepo)))
            .andExpect(status().isOk());

        // Validate the ExternalRepo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeUpdate);
        Repo testRepo = repoList.get(repoList.size() - 1);
        assertThat(testRepo.getUri()).isEqualTo(UPDATED_URI);

        // Validate the ExternalRepo in Elasticsearch
        verify(mockRepoSearchRepository, times(1)).save(testRepo);
    }

    @Test
    @Transactional
    public void updateNonExistingRepo() throws Exception {
        int databaseSizeBeforeUpdate = repoRepository.findAll().size();

        // Create the ExternalRepo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRepoMockMvc.perform(put("/api/repos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repo)))
            .andExpect(status().isBadRequest());

        // Validate the ExternalRepo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ExternalRepo in Elasticsearch
        verify(mockRepoSearchRepository, times(0)).save(repo);
    }

    @Test
    @Transactional
    public void deleteRepo() throws Exception {
        // Initialize the database
        repoService.save(repo);

        int databaseSizeBeforeDelete = repoRepository.findAll().size();

        // Get the repo
        restRepoMockMvc.perform(delete("/api/repos/{id}", repo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ExternalRepo in Elasticsearch
        verify(mockRepoSearchRepository, times(1)).deleteById(repo.getId());
    }

    @Test
    @Transactional
    public void searchRepo() throws Exception {
        // Initialize the database
        repoService.save(repo);
        when(mockRepoSearchRepository.search(queryStringQuery("id:" + repo.getId())))
            .thenReturn(Collections.singletonList(repo));
        // Search the repo
        restRepoMockMvc.perform(get("/api/_search/repos?query=id:" + repo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repo.getId().intValue())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repo.class);
        Repo repo1 = new Repo();
        repo1.setId(1L);
        Repo repo2 = new Repo();
        repo2.setId(repo1.getId());
        assertThat(repo1).isEqualTo(repo2);
        repo2.setId(2L);
        assertThat(repo1).isNotEqualTo(repo2);
        repo1.setId(null);
        assertThat(repo1).isNotEqualTo(repo2);
    }
}
