package com.floravision.backend.repositories;

import com.floravision.backend.entities.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findBySlug(String slug);
    List<Plant> findByCategory(String category);
}
