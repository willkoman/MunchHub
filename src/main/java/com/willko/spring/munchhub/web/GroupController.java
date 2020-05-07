package com.willko.spring.munchhub.web;

import com.willko.spring.munchhub.model.Restaurant;
import com.willko.spring.munchhub.model.RestaurantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private RestaurantRepository restaurantRepository;

    public GroupController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping("/groups")
    Collection<Restaurant> groups() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/group/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Restaurant> group = restaurantRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group/{id}")
    ResponseEntity<Restaurant> createGroup(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.info("Request to create group: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/group/{id}")
    ResponseEntity<Restaurant> updateGroup(@Valid @RequestBody Restaurant restaurant) {
        log.info("Request to update group: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        restaurantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}