package com.coqe.bluesource.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Document(indexName = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "status")
    private String status;

    @Column(name = "issue_tracker_uri")
    private String issueTrackerUri;

    @Lob
    @Column(name = "attachment")
    private byte[] attachment;

    @Column(name = "attachment_content_type")
    private String attachmentContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Repo repo;

    @OneToMany(mappedBy = "created")
    private Set<UserProfile> createdBies = new HashSet<>();

    @OneToMany(mappedBy = "project")
    private Set<Comment> comments = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "project_technologies",
               joinColumns = @JoinColumn(name = "projects_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "technologies_id", referencedColumnName = "id"))
    private Set<Keyword> technologies = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "project_contributor",
               joinColumns = @JoinColumn(name = "projects_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contributors_id", referencedColumnName = "id"))
    private Set<UserProfile> contributors = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "project_admins",
               joinColumns = @JoinColumn(name = "projects_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "admins_id", referencedColumnName = "id"))
    private Set<UserProfile> admins = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public Project createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Project logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Project logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getStatus() {
        return status;
    }

    public Project status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIssueTrackerUri() {
        return issueTrackerUri;
    }

    public Project issueTrackerUri(String issueTrackerUri) {
        this.issueTrackerUri = issueTrackerUri;
        return this;
    }

    public void setIssueTrackerUri(String issueTrackerUri) {
        this.issueTrackerUri = issueTrackerUri;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public Project attachment(byte[] attachment) {
        this.attachment = attachment;
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public Project attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public Repo getRepo() {
        return repo;
    }

    public Project repo(Repo repo) {
        this.repo = repo;
        return this;
    }

    public void setRepo(Repo repo) {
        this.repo = repo;
    }

    public Set<UserProfile> getCreatedBies() {
        return createdBies;
    }

    public Project createdBies(Set<UserProfile> userProfiles) {
        this.createdBies = userProfiles;
        return this;
    }

    public Project addCreatedBy(UserProfile userProfile) {
        this.createdBies.add(userProfile);
        userProfile.setCreated(this);
        return this;
    }

    public Project removeCreatedBy(UserProfile userProfile) {
        this.createdBies.remove(userProfile);
        userProfile.setCreated(null);
        return this;
    }

    public void setCreatedBies(Set<UserProfile> userProfiles) {
        this.createdBies = userProfiles;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Project comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Project addComment(Comment comment) {
        this.comments.add(comment);
        comment.setProject(this);
        return this;
    }

    public Project removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setProject(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Keyword> getTechnologies() {
        return technologies;
    }

    public Project technologies(Set<Keyword> keywords) {
        this.technologies = keywords;
        return this;
    }

    public Project addTechnologies(Keyword keyword) {
        this.technologies.add(keyword);
        keyword.getProjects().add(this);
        return this;
    }

    public Project removeTechnologies(Keyword keyword) {
        this.technologies.remove(keyword);
        keyword.getProjects().remove(this);
        return this;
    }

    public void setTechnologies(Set<Keyword> keywords) {
        this.technologies = keywords;
    }

    public Set<UserProfile> getContributors() {
        return contributors;
    }

    public Project contributors(Set<UserProfile> userProfiles) {
        this.contributors = userProfiles;
        return this;
    }

    public Project addContributor(UserProfile userProfile) {
        this.contributors.add(userProfile);
        userProfile.getProjects().add(this);
        return this;
    }

    public Project removeContributor(UserProfile userProfile) {
        this.contributors.remove(userProfile);
        userProfile.getProjects().remove(this);
        return this;
    }

    public void setContributors(Set<UserProfile> userProfiles) {
        this.contributors = userProfiles;
    }

    public Set<UserProfile> getAdmins() {
        return admins;
    }

    public Project admins(Set<UserProfile> userProfiles) {
        this.admins = userProfiles;
        return this;
    }

    public Project addAdmins(UserProfile userProfile) {
        this.admins.add(userProfile);
        userProfile.getAdministrators().add(this);
        return this;
    }

    public Project removeAdmins(UserProfile userProfile) {
        this.admins.remove(userProfile);
        userProfile.getAdministrators().remove(this);
        return this;
    }

    public void setAdmins(Set<UserProfile> userProfiles) {
        this.admins = userProfiles;
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
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", description='" + getDescription() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", status='" + getStatus() + "'" +
            ", issueTrackerUri='" + getIssueTrackerUri() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", attachmentContentType='" + getAttachmentContentType() + "'" +
            "}";
    }
}
