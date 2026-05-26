package com.floravision.backend.controllers;

import com.floravision.backend.entities.Review;
import com.floravision.backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getApprovedReviews() {
        return ResponseEntity.ok(reviewRepository.findByApprovedTrueOrderByCreatedAtDesc());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewRepository.findAll());
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<Review>> getPlantReviews(@PathVariable("plantId") Long plantId) {
        return ResponseEntity.ok(reviewRepository.findByPlantIdAndApprovedTrue(plantId));
    }

    @PostMapping
    public ResponseEntity<Review> submitReview(@RequestBody Review review) {
        // Enforce review validation
        if (review.getCustomerName() == null || review.getCustomerName().trim().isEmpty()) {
            throw new IllegalArgumentException("Review author name cannot be empty.");
        }
        if (review.getRating() == null) {
            throw new IllegalArgumentException("Rating is required.");
        }
        if (review.getComment() == null || review.getComment().trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty.");
        }

        // Set safety parameters
        review.setApproved(true); // Default to approved for development
        Review saved = reviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Review> toggleReviewApproval(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> approvalDetails) {
        Boolean approved = approvalDetails.get("approved");
        if (approved == null) {
            throw new IllegalArgumentException("Approved status value is required.");
        }
        return reviewRepository.findById(id)
                .map(review -> {
                    review.setApproved(approved);
                    Review updated = reviewRepository.save(review);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        if (!reviewRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reviewRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
