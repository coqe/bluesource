package com.coqe.bluesource.repomanager;


import java.util.Date;
import java.util.Set;

import com.google.common.base.Joiner;

public interface RepoDetails<T extends ExternalRepo> {
    
    Joiner JOINER = Joiner.on(",").useForNull("");
    
    Set<String> getContributors(T repo);
    
    String getHomepage(T repo);
    
    String getFullname(T repo);
    
    String getDescription(T repo);
    
    String getLabels(T repo);
    
    int getOpenIssuesCount(T repo);
    
    String getOwnerName(T repo);
    
    Date getCreatedDate(T repo);
    
    default String getInfoCSV(T repo) {
        return JOINER.join(getHomepage(repo), getFullname(repo), getDescription(repo), getCreatedDate(repo));
    }
}
