package com.willko.spring.munchhub;

import com.willko.spring.munchhub.model.Event;
import com.willko.spring.munchhub.model.Group;
import com.willko.spring.munchhub.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("McSpankies", "Krusty Shack", "Sushi Supreme",
                "Tasty Cream").forEach(name ->
                repository.save(new Group(name))
        );

        Group djug = repository.findByName("McSpankies");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.parse("2020-04-27T12:54:00.000Z"))
                .build();
        djug.setEvents(Collections.singleton(e));
        repository.save(djug);

        repository.findAll().forEach(System.out::println);
    }
}
