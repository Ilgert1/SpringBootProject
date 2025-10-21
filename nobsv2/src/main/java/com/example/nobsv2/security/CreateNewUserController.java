package com.example.nobsv2.security;
import com.example.nobsv2.product.validators.PasswordValidator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController

public class CreateNewUserController {

    private final PasswordEncoder encoder;
    private final CustomUserRepository customUserRepository;

    public CreateNewUserController(PasswordEncoder encoder, CustomUserRepository customUserRepository) {
        this.encoder = encoder;
        this.customUserRepository = customUserRepository;
    }

    @PostMapping("/createnewuser")
    public ResponseEntity<String> createNewUser(@RequestBody CustomUser user) {
        // Validate username
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required.");
        }

        if (user.getUsername().length() < 3) {
            return ResponseEntity.badRequest().body("Username must be at least 3 characters long.");
        }

        // Validate password strength
        String passwordError = PasswordValidator.getPasswordErrorMessage(user.getPassword());
        if (passwordError != null) {
            return ResponseEntity.badRequest().body(passwordError);
        }

        // Check if user already exists
        Optional<CustomUser> existingUser = customUserRepository.findById(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        try {
            // Create and save new user
            CustomUser newUser = new CustomUser(
                    user.getUsername(),
                    encoder.encode(user.getPassword()),
                    "ROLE_BASIC"
            );
            customUserRepository.save(newUser);
            System.out.println("User created successfully: " + user.getUsername());
            return ResponseEntity.ok("Account created successfully. You can now log in.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while creating the account.");
        }
    }
}