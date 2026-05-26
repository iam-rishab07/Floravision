package com.floravision.backend.controllers;

import com.floravision.backend.entities.Plant;
import com.floravision.backend.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    private final PlantRepository plantRepository;

    @Autowired
    public PlantController(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants(@RequestParam(value = "category", required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(plantRepository.findByCategory(category));
        }
        return ResponseEntity.ok(plantRepository.findAll());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Plant> getPlantBySlug(@PathVariable("slug") String slug) {
        return plantRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Plant> createPlant(@RequestBody Plant plant) {
        if (plant.getSlug() == null || plant.getSlug().trim().isEmpty()) {
            throw new IllegalArgumentException("Plant slug is required.");
        }
        if (plant.getName() == null || plant.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Plant name is required.");
        }
        if (plantRepository.findBySlug(plant.getSlug()).isPresent()) {
            throw new IllegalArgumentException("Plant with this slug already exists.");
        }
        Plant saved = plantRepository.save(plant);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable("id") Long id, @RequestBody Plant plantDetails) {
        return plantRepository.findById(id)
                .map(plant -> {
                    plant.setName(plantDetails.getName());
                    plant.setCategory(plantDetails.getCategory());
                    plant.setPrice(plantDetails.getPrice());
                    plant.setImageUrl(plantDetails.getImageUrl());
                    plant.setDescription(plantDetails.getDescription());
                    plant.setSunlight(plantDetails.getSunlight());
                    plant.setWater(plantDetails.getWater());
                    plant.setDifficulty(plantDetails.getDifficulty());
                    plant.setSize(plantDetails.getSize());
                    plant.setPetFriendly(plantDetails.isPetFriendly());
                    plant.setAbout(plantDetails.getAbout());
                    plant.setStockQuantity(plantDetails.getStockQuantity());
                    Plant updated = plantRepository.save(plant);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable("id") Long id) {
        if (!plantRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        plantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
