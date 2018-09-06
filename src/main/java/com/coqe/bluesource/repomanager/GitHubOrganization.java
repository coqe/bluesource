package com.coqe.bluesource.repomanager;


import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

import org.kohsuke.github.GHOrganization;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;

public class GitHubOrganization implements Organization {
    
    private final GitHub gitHub;
    
    private final GHOrganization organization;
    
    public GitHubOrganization(String organization, GitHub github) {
        this.gitHub = github;
        try {
            this.organization = github.getOrganization(organization);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    @Override
    public Map<String, ? extends Repo> repos() {
        try {
            final Map<String, GHRepository> repositories = organization.getRepositories();
            return repositories.values().stream().map(GitHubRepo::new).collect(Collectors.toMap(e -> e.get().getName(), e -> e));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
