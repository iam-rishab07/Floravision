package com.floravision.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Enforces memory-hard, salted password hashing via BCrypt
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // TODO(security): If authentication switches from stateless token headers (e.g., JWT) to HTTP cookies,
            // CSRF protection must be fully enabled and configured with token verification.
            .csrf(csrf -> csrf.disable()) 
            
            // Link custom CORS configurations to allow local React app communication
            .cors(cors -> {}) 
            
            .authorizeHttpRequests(auth -> auth
                // Allow public access to catalog, reviews, inquiry, and order submissions during local API development
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
