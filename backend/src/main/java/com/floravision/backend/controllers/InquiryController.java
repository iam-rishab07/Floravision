package com.floravision.backend.controllers;

import com.floravision.backend.entities.Inquiry;
import com.floravision.backend.repositories.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryRepository inquiryRepository;

    @Autowired
    public InquiryController(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<Inquiry> submitInquiry(@RequestBody Inquiry inquiry) {
        if (inquiry.getName() == null || inquiry.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Inquiry sender name cannot be empty.");
        }
        if (inquiry.getEmail() == null || inquiry.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Inquiry contact email cannot be empty.");
        }
        if (inquiry.getMessage() == null || inquiry.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Inquiry message body cannot be empty.");
        }

        inquiry.setResolved(false);
        Inquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Inquiry>> getUnresolvedInquiries() {
        return ResponseEntity.ok(inquiryRepository.findByResolvedFalse());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAll());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Inquiry> toggleInquiryResolved(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> resolutionDetails) {
        Boolean resolved = resolutionDetails.get("resolved");
        if (resolved == null) {
            throw new IllegalArgumentException("Resolved status value is required.");
        }
        return inquiryRepository.findById(id)
                .map(inquiry -> {
                    inquiry.setResolved(resolved);
                    Inquiry updated = inquiryRepository.save(inquiry);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable("id") Long id) {
        if (!inquiryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        inquiryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
