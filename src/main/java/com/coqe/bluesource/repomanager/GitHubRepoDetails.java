package com.coqe.bluesource.repomanager;

import java.io.IOException;
import java.util.Date;
import java.util.Set;

public class GitHubRepoDetails implements RepoDetails<GitHubRepo> {
    
    @Override
    public Set<String> getContributors(GitHubRepo repo) {
        try {
            return repo.get().getCollaboratorNames();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    
    
    @Override
    public String getHomepage(GitHubRepo repo) {
        return repo.get().getHomepage();
    }
    
    @Override
    public String getFullname(GitHubRepo repo) {
        return repo.get().getFullName();
    }
    
    @Override
    public String getDescription(GitHubRepo repo) {
        return repo.get().getDescription();
    }
    
    @Override
    public String getLabels(GitHubRepo repo) {
        return null;
    }
    
    @Override
    public int getOpenIssuesCount(GitHubRepo repo) {
        return repo.get().getOpenIssueCount();
    }
    
    @Override
    public String getOwnerName(GitHubRepo repo) {
        return repo.get().getOwnerName();
    }
    
    @Override
    public Date getCreatedDate(GitHubRepo repo) {
        try {
            return repo.get().getCreatedAt();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    public RepoDetailsDto toRepoDetailsDto(GitHubRepo repo){
        RepoDetailsDto dto = new RepoDetailsDto();
        dto.setContributors(getContributors(repo));
        dto.setCreatedDate(getCreatedDate(repo));
        dto.setDescription(getDescription(repo));
        dto.setFullname(getFullname(repo));
        dto.setHomepage(getHomepage(repo));
        dto.setLabels(getLabels(repo));
        dto.setOpenIssuesCount(getOpenIssuesCount(repo));
        return dto;
    }
    
}
