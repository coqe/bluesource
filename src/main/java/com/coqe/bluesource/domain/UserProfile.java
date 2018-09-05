package com.coqe.bluesource.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

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

    @ManyToMany
    @JoinTable(name = "user_profile_skill",
               joinColumns = @JoinColumn(name = "user_profiles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "skills_id", referencedColumnName = "id"))
    private Set<Skill> skills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("createdBies")
    private Project created;

    @ManyToMany(mappedBy = "contributors")
    @JsonIgnore
    private Set<Project> projects = new HashSet<>();

    @ManyToMany(mappedBy = "admins")
    @JsonIgnore
    private Set<Project> administrators = new HashSet<>();

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

    public Set<Skill> getSkills() {
        return skills;
    }

    public UserProfile skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public UserProfile addSkill(Skill skill) {
        this.skills.add(skill);
        skill.getUsers().add(this);
        return this;
    }

    public UserProfile removeSkill(Skill skill) {
        this.skills.remove(skill);
        skill.getUsers().remove(this);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Project getCreated() {
        return created;
    }

    public UserProfile created(Project project) {
        this.created = project;
        return this;
    }

    public void setCreated(Project project) {
        this.created = project;
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

    public Set<Project> getAdministrators() {
        return administrators;
    }

    public UserProfile administrators(Set<Project> projects) {
        this.administrators = projects;
        return this;
    }

    public UserProfile addAdministrator(Project project) {
        this.administrators.add(project);
        project.getAdmins().add(this);
        return this;
    }

    public UserProfile removeAdministrator(Project project) {
        this.administrators.remove(project);
        project.getAdmins().remove(this);
        return this;
    }

    public void setAdministrators(Set<Project> projects) {
        this.administrators = projects;
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
