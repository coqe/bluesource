package com.coqe.bluesource.web.rest;

import com.coqe.bluesource.BluesourceApp;

import com.coqe.bluesource.domain.Keyword;
import com.coqe.bluesource.repository.KeywordRepository;
import com.coqe.bluesource.repository.search.KeywordSearchRepository;
import com.coqe.bluesource.service.KeywordService;
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
 * Test class for the KeywordResource REST controller.
 *
 * @see KeywordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BluesourceApp.class)
public class KeywordResourceIntTest {

    private static final String DEFAULT_WORD = "AAAAAAAAAA";
    private static final String UPDATED_WORD = "BBBBBBBBBB";

    @Autowired
    private KeywordRepository keywordRepository;

    

    @Autowired
    private KeywordService keywordService;

    /**
     * This repository is mocked in the com.coqe.bluesource.repository.search test package.
     *
     * @see com.coqe.bluesource.repository.search.KeywordSearchRepositoryMockConfiguration
     */
    @Autowired
    private KeywordSearchRepository mockKeywordSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKeywordMockMvc;

    private Keyword keyword;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeywordResource keywordResource = new KeywordResource(keywordService);
        this.restKeywordMockMvc = MockMvcBuilders.standaloneSetup(keywordResource)
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
    public static Keyword createEntity(EntityManager em) {
        Keyword keyword = new Keyword()
            .word(DEFAULT_WORD);
        return keyword;
    }

    @Before
    public void initTest() {
        keyword = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeyword() throws Exception {
        int databaseSizeBeforeCreate = keywordRepository.findAll().size();

        // Create the Keyword
        restKeywordMockMvc.perform(post("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyword)))
            .andExpect(status().isCreated());

        // Validate the Keyword in the database
        List<Keyword> keywordList = keywordRepository.findAll();
        assertThat(keywordList).hasSize(databaseSizeBeforeCreate + 1);
        Keyword testKeyword = keywordList.get(keywordList.size() - 1);
        assertThat(testKeyword.getWord()).isEqualTo(DEFAULT_WORD);

        // Validate the Keyword in Elasticsearch
        verify(mockKeywordSearchRepository, times(1)).save(testKeyword);
    }

    @Test
    @Transactional
    public void createKeywordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keywordRepository.findAll().size();

        // Create the Keyword with an existing ID
        keyword.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeywordMockMvc.perform(post("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyword)))
            .andExpect(status().isBadRequest());

        // Validate the Keyword in the database
        List<Keyword> keywordList = keywordRepository.findAll();
        assertThat(keywordList).hasSize(databaseSizeBeforeCreate);

        // Validate the Keyword in Elasticsearch
        verify(mockKeywordSearchRepository, times(0)).save(keyword);
    }

    @Test
    @Transactional
    public void getAllKeywords() throws Exception {
        // Initialize the database
        keywordRepository.saveAndFlush(keyword);

        // Get all the keywordList
        restKeywordMockMvc.perform(get("/api/keywords?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyword.getId().intValue())))
            .andExpect(jsonPath("$.[*].word").value(hasItem(DEFAULT_WORD.toString())));
    }
    

    @Test
    @Transactional
    public void getKeyword() throws Exception {
        // Initialize the database
        keywordRepository.saveAndFlush(keyword);

        // Get the keyword
        restKeywordMockMvc.perform(get("/api/keywords/{id}", keyword.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keyword.getId().intValue()))
            .andExpect(jsonPath("$.word").value(DEFAULT_WORD.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingKeyword() throws Exception {
        // Get the keyword
        restKeywordMockMvc.perform(get("/api/keywords/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeyword() throws Exception {
        // Initialize the database
        keywordService.save(keyword);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockKeywordSearchRepository);

        int databaseSizeBeforeUpdate = keywordRepository.findAll().size();

        // Update the keyword
        Keyword updatedKeyword = keywordRepository.findById(keyword.getId()).get();
        // Disconnect from session so that the updates on updatedKeyword are not directly saved in db
        em.detach(updatedKeyword);
        updatedKeyword
            .word(UPDATED_WORD);

        restKeywordMockMvc.perform(put("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeyword)))
            .andExpect(status().isOk());

        // Validate the Keyword in the database
        List<Keyword> keywordList = keywordRepository.findAll();
        assertThat(keywordList).hasSize(databaseSizeBeforeUpdate);
        Keyword testKeyword = keywordList.get(keywordList.size() - 1);
        assertThat(testKeyword.getWord()).isEqualTo(UPDATED_WORD);

        // Validate the Keyword in Elasticsearch
        verify(mockKeywordSearchRepository, times(1)).save(testKeyword);
    }

    @Test
    @Transactional
    public void updateNonExistingKeyword() throws Exception {
        int databaseSizeBeforeUpdate = keywordRepository.findAll().size();

        // Create the Keyword

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restKeywordMockMvc.perform(put("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyword)))
            .andExpect(status().isBadRequest());

        // Validate the Keyword in the database
        List<Keyword> keywordList = keywordRepository.findAll();
        assertThat(keywordList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Keyword in Elasticsearch
        verify(mockKeywordSearchRepository, times(0)).save(keyword);
    }

    @Test
    @Transactional
    public void deleteKeyword() throws Exception {
        // Initialize the database
        keywordService.save(keyword);

        int databaseSizeBeforeDelete = keywordRepository.findAll().size();

        // Get the keyword
        restKeywordMockMvc.perform(delete("/api/keywords/{id}", keyword.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Keyword> keywordList = keywordRepository.findAll();
        assertThat(keywordList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Keyword in Elasticsearch
        verify(mockKeywordSearchRepository, times(1)).deleteById(keyword.getId());
    }

    @Test
    @Transactional
    public void searchKeyword() throws Exception {
        // Initialize the database
        keywordService.save(keyword);
        when(mockKeywordSearchRepository.search(queryStringQuery("id:" + keyword.getId())))
            .thenReturn(Collections.singletonList(keyword));
        // Search the keyword
        restKeywordMockMvc.perform(get("/api/_search/keywords?query=id:" + keyword.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyword.getId().intValue())))
            .andExpect(jsonPath("$.[*].word").value(hasItem(DEFAULT_WORD.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Keyword.class);
        Keyword keyword1 = new Keyword();
        keyword1.setId(1L);
        Keyword keyword2 = new Keyword();
        keyword2.setId(keyword1.getId());
        assertThat(keyword1).isEqualTo(keyword2);
        keyword2.setId(2L);
        assertThat(keyword1).isNotEqualTo(keyword2);
        keyword1.setId(null);
        assertThat(keyword1).isNotEqualTo(keyword2);
    }
}
