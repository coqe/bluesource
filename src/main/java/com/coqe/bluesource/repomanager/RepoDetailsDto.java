package com.coqe.bluesource.repomanager;

import java.util.Date;
import java.util.Set;

public class RepoDetailsDto {
    
    private Set<String> contributors;
    private String Homepage;
    private String Fullname;
    private String Description;
    private String Labels;
    private int OpenIssuesCount;
    private Date CreatedDate;
    
    public Set<String> getContributors() {
        return contributors;
    }
    
    public void setContributors(Set<String> contributors) {
        this.contributors = contributors;
    }
    
    public String getHomepage() {
        return Homepage;
    }
    
    public void setHomepage(String homepage) {
        Homepage = homepage;
    }
    
    public String getFullname() {
        return Fullname;
    }
    
    public void setFullname(String fullname) {
        Fullname = fullname;
    }
    
    public String getDescription() {
        return Description;
    }
    
    public void setDescription(String description) {
        Description = description;
    }
    
    public String getLabels() {
        return Labels;
    }
    
    public void setLabels(String labels) {
        Labels = labels;
    }
    
    public int getOpenIssuesCount() {
        return OpenIssuesCount;
    }
    
    public void setOpenIssuesCount(int openIssuesCount) {
        OpenIssuesCount = openIssuesCount;
    }
    
    public Date getCreatedDate() {
        return CreatedDate;
    }
    
    public void setCreatedDate(Date createdDate) {
        CreatedDate = createdDate;
    }
}
