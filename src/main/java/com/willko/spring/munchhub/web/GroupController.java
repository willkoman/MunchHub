package com.willko.spring.munchhub.web;

import com.willko.spring.munchhub.model.MenuItem;
import com.willko.spring.munchhub.model.Restaurant;
import com.willko.spring.munchhub.model.RestaurantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/restaurants")
    Collection<Restaurant> groups() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/restaurant/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Restaurant> group = restaurantRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/restaurant/{id}/menu")
    ResponseEntity<?> getMenu(@PathVariable Long id) {
        Optional<Restaurant> group = restaurantRepository.findById(id);
        log.info(group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).toString());
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/restaurant/{id}")
    ResponseEntity<Restaurant> createGroup(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.info("Request to create group: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/restaurant/{id}")
    ResponseEntity<Restaurant> updateGroup(@Valid @RequestBody Restaurant restaurant) {
        log.info("Request to update group: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/restaurant/{id}/order")
    ResponseEntity<Restaurant> orderGroup(@Valid @RequestBody Restaurant restaurant) {
        log.info("Request to update group: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/restaurant/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        restaurantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFile(@PathVariable Long id, @RequestParam MultipartFile file) {
    log.info("Trying to upload image for group: {}",id);
        Path path = Paths.get("I:/MunchHub/src/main/java/com/willko/spring/munchhub/app/public/images/restaurants/"+id+".jpg");
        try {
            file.transferTo(path);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().build();
    }
}