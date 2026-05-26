package com.floravision.backend.services;

import com.floravision.backend.entities.User;
import com.floravision.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User registerUser(User user) {
        // 1. Check if email is already taken
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email address is already in use.");
        }

        // 2. Validate password strength
        validatePassword(user.getPasswordHash());

        // 3. Securely hash password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        // 4. Force default customer role if not specified
        if (user.getRole() == null) {
            user.setRole(User.Role.customer);
        }

        return userRepository.save(user);
    }

    private void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be blank.");
        }
        
        // Enforce minimum 12 characters password strength rule (security guideline)
        if (password.length() < 12) {
            throw new IllegalArgumentException("Password must be at least 12 characters long for maximum security.");
        }
    }

    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setAddress(userDetails.getAddress());
        user.setZipCode(userDetails.getZipCode());
        return userRepository.save(user);
    }
}
