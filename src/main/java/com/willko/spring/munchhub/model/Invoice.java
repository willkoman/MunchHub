package com.willko.spring.munchhub.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<MenuItem> items;

    public void addItem(MenuItem menuItem){
        items.add((menuItem));
    }
    public void addItems(List<MenuItem> menuItems){
        items.addAll((menuItems));
    }
}
