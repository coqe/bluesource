package com.coqe.bluesource.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Keyword.
 */
@Entity
@Table(name = "keyword")
@Document(indexName = "keyword")
public class Keyword implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "word")
    private String word;

    @ManyToMany(mappedBy = "technologies")
    @JsonIgnore
    private Set<Project> projects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public Keyword word(String word) {
        this.word = word;
        return this;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public Keyword projects(Set<Project> projects) {
        this.projects = projects;
        return this;
    }

    public Keyword addProject(Project project) {
        this.projects.add(project);
        project.getTechnologies().add(this);
        return this;
    }

    public Keyword removeProject(Project project) {
        this.projects.remove(project);
        project.getTechnologies().remove(this);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Keyword keyword = (Keyword) o;
        if (keyword.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keyword.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Keyword{" +
            "id=" + getId() +
            ", word='" + getWord() + "'" +
            "}";
    }
}
