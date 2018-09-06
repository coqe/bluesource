package com.coqe.bluesource.repomanager;

import java.util.Map;

public interface Organization {
    Map<String, ? extends ExternalRepo> repos();
}
