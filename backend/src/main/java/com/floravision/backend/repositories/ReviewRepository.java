package com.floravision.backend.repositories;

import com.floravision.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlantIdAndApprovedTrue(Long plantId);
    List<Review> findByApprovedTrueOrderByCreatedAtDesc();
}
