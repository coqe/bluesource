package com.coqe.bluesource.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Issue.
 */
@Entity
@Table(name = "issue")
@Document(indexName = "issue")
public class Issue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "summary")
    private String summary;

    @Lob
    @Column(name = "full_description")
    private String fullDescription;

    @Column(name = "interest")
    private Integer interest;

    @Min(value = 0)
    @Max(value = 1000)
    @Column(name = "rewards")
    private Integer rewards;

    @OneToMany(mappedBy = "issue")
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("raises")
    private UserProfile createdBy;

    @OneToMany(mappedBy = "issue")
    private Set<Project> projects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public Issue summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public Issue fullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
        return this;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public Integer getInterest() {
        return interest;
    }

    public Issue interest(Integer interest) {
        this.interest = interest;
        return this;
    }

    public void setInterest(Integer interest) {
        this.interest = interest;
    }

    public Integer getRewards() {
        return rewards;
    }

    public Issue rewards(Integer rewards) {
        this.rewards = rewards;
        return this;
    }

    public void setRewards(Integer rewards) {
        this.rewards = rewards;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Issue comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Issue addComment(Comment comment) {
        this.comments.add(comment);
        comment.setIssue(this);
        return this;
    }

    public Issue removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setIssue(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public UserProfile getCreatedBy() {
        return createdBy;
    }

    public Issue createdBy(UserProfile userProfile) {
        this.createdBy = userProfile;
        return this;
    }

    public void setCreatedBy(UserProfile userProfile) {
        this.createdBy = userProfile;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public Issue projects(Set<Project> projects) {
        this.projects = projects;
        return this;
    }

    public Issue addProject(Project project) {
        this.projects.add(project);
        project.setIssue(this);
        return this;
    }

    public Issue removeProject(Project project) {
        this.projects.remove(project);
        project.setIssue(null);
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
        Issue issue = (Issue) o;
        if (issue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), issue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Issue{" +
            "id=" + getId() +
            ", summary='" + getSummary() + "'" +
            ", fullDescription='" + getFullDescription() + "'" +
            ", interest=" + getInterest() +
            ", rewards=" + getRewards() +
            "}";
    }
}
