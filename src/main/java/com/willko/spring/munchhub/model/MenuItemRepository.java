package com.willko.spring.munchhub.model;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    MenuItem getById(Long id);
    Optional<MenuItem> findById(Long id);
}