package com.willko.spring.munchhub;

import com.willko.spring.munchhub.model.MenuItemRepository;
import com.willko.spring.munchhub.model.Restaurant;
import com.willko.spring.munchhub.model.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final RestaurantRepository repository;
    private final MenuItemRepository menuItemRepository;
    public Initializer(RestaurantRepository repository, MenuItemRepository menuItemRepository) {
        this.repository = repository;
        this.menuItemRepository=menuItemRepository;
    }

    @Override
    public void run(String... strings) {
//
//        Stream.of("McSpankies", "Krusty Shack", "Sushi Supreme",
//                "Tasty Cream").forEach(name ->
//                repository.save(new Restaurant(name))
//        );
//        Restaurant djug = repository.findByName("McSpankies");
//        repository.save(djug);
//
//        repository.findAll().forEach(System.out::println);

    }
}
