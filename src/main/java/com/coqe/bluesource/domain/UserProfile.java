package com.coqe.bluesource.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.elasticsearch.annotations.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
@Document(indexName = "userprofile")
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_role")
    private String role;

    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private User account;

    @OneToMany(mappedBy = "createdBy")
    private Set<Project> creates = new HashSet<>();

    @OneToMany(mappedBy = "madeBy")
    private Set<Comment> makes = new HashSet<>();

    @OneToMany(mappedBy = "createdBy")
    private Set<Issue> raises = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_profile_skill",
               joinColumns = @JoinColumn(name = "user_profiles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "skills_id", referencedColumnName = "id"))
    private Set<Keyword> skills = new HashSet<>();

    @ManyToMany(mappedBy = "contributors")
    @JsonIgnore
    private Set<Project> projects = new HashSet<>();

    @ManyToMany(mappedBy = "admins")
    @JsonIgnore
    private Set<Project> administers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public UserProfile role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public UserProfile avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public UserProfile avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public User getAccount() {
        return account;
    }

    public UserProfile account(User user) {
        this.account = user;
        return this;
    }

    public void setAccount(User user) {
        this.account = user;
    }

    public Set<Project> getCreates() {
        return creates;
    }

    public UserProfile creates(Set<Project> projects) {
        this.creates = projects;
        return this;
    }

    public UserProfile addCreate(Project project) {
        this.creates.add(project);
        project.setCreatedBy(this);
        return this;
    }

    public UserProfile removeCreate(Project project) {
        this.creates.remove(project);
        project.setCreatedBy(null);
        return this;
    }

    public void setCreates(Set<Project> projects) {
        this.creates = projects;
    }

    public Set<Comment> getMakes() {
        return makes;
    }

    public UserProfile makes(Set<Comment> comments) {
        this.makes = comments;
        return this;
    }

    public UserProfile addMake(Comment comment) {
        this.makes.add(comment);
        comment.setMadeBy(this);
        return this;
    }

    public UserProfile removeMake(Comment comment) {
        this.makes.remove(comment);
        comment.setMadeBy(null);
        return this;
    }

    public void setMakes(Set<Comment> comments) {
        this.makes = comments;
    }

    public Set<Issue> getRaises() {
        return raises;
    }

    public UserProfile raises(Set<Issue> issues) {
        this.raises = issues;
        return this;
    }

    public UserProfile addRaise(Issue issue) {
        this.raises.add(issue);
        issue.setCreatedBy(this);
        return this;
    }

    public UserProfile removeRaise(Issue issue) {
        this.raises.remove(issue);
        issue.setCreatedBy(null);
        return this;
    }

    public void setRaises(Set<Issue> issues) {
        this.raises = issues;
    }

    public Set<Keyword> getSkills() {
        return skills;
    }

    public UserProfile skills(Set<Keyword> keywords) {
        this.skills = keywords;
        return this;
    }

    public UserProfile addSkill(Keyword keyword) {
        this.skills.add(keyword);
        keyword.getUsers().add(this);
        return this;
    }

    public UserProfile removeSkill(Keyword keyword) {
        this.skills.remove(keyword);
        keyword.getUsers().remove(this);
        return this;
    }

    public void setSkills(Set<Keyword> keywords) {
        this.skills = keywords;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public UserProfile projects(Set<Project> projects) {
        this.projects = projects;
        return this;
    }

    public UserProfile addProject(Project project) {
        this.projects.add(project);
        project.getContributors().add(this);
        return this;
    }

    public UserProfile removeProject(Project project) {
        this.projects.remove(project);
        project.getContributors().remove(this);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Project> getAdministers() {
        return administers;
    }

    public UserProfile administers(Set<Project> projects) {
        this.administers = projects;
        return this;
    }

    public UserProfile addAdminister(Project project) {
        this.administers.add(project);
        project.getAdmins().add(this);
        return this;
    }

    public UserProfile removeAdminister(Project project) {
        this.administers.remove(project);
        project.getAdmins().remove(this);
        return this;
    }

    public void setAdministers(Set<Project> projects) {
        this.administers = projects;
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
        UserProfile userProfile = (UserProfile) o;
        if (userProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", avatarContentType='" + getAvatarContentType() + "'" +
            "}";
    }
}
