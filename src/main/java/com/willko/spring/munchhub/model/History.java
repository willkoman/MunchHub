package com.willko.spring.munchhub.model;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.List;

public class History {
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Invoice> orders;
}
