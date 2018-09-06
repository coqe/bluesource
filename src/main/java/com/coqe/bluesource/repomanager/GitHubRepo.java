package com.coqe.bluesource.repomanager;

import org.kohsuke.github.GHRepository;

public class GitHubRepo implements Repo<GHRepository> {
    
    private final GHRepository repository;
    
    public GitHubRepo(GHRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public GHRepository get() {
        return repository;
    }
}
