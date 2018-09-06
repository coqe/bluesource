package com.coqe.bluesource.repomanager;

import java.io.IOException;

import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;

public class GitHubRepo implements ExternalRepo<GHRepository> {
    
    private final GHRepository repository;
    
    public GitHubRepo(GHRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public GHRepository get() {
        return repository;
    }
    
    public static ExternalRepo<GHRepository> findRepo(String fullPath) {
        try {
            GitHub github = GitHub.connect();
            String orgPath = fullPath.replace("https://github.com/","");
            return new GitHubRepo(github.getRepository(orgPath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
}
