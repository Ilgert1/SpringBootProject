package com.example.nobsv2.security;


import com.example.nobsv2.email.EmailService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class PasswordResetController {

    //injections
    private final CustomUserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;


    @PostMapping("/forgot-password")
    @Transactional
    public ResponseEntity<MessageResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            String email = request.getEmail();
            log.info("🔐 Password reset requested for email: {}", email);

            CustomUser user = userRepository.findByEmail(email)
                    .orElse(null);

            if (user == null) {
                log.warn("⚠️ Password reset requested for non-existent email: {}", email);
                return ResponseEntity.ok(new MessageResponse(
                        "If an account with that email exists, we've sent a password reset link."
                ));
            }

            // Delete any existing tokens for this user
            tokenRepository.deleteByUserUsername(user.getUsername()); // UPDATED

            // Generate reset token
            String token = UUID.randomUUID().toString();
            LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

            PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
            tokenRepository.save(resetToken);

            // Send email
            emailService.sendPasswordResetEmail(user.getEmail(), token);

            log.info("✅ Password reset token created for user: {}", user.getUsername());

            return ResponseEntity.ok(new MessageResponse(
                    "If an account with that email exists, we've sent a password reset link."
            ));

        } catch (Exception e) {
            log.error("❌ Password reset failed", e);
            return ResponseEntity.status(500).body(new MessageResponse(
                    "Something went wrong. Please try again later."
            ));
        }
    }

    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            String token = request.getToken();
            String newPassword = request.getNewPassword();

            log.info("🔐 Password reset attempted with token");

            // Find token
            PasswordResetToken resetToken = tokenRepository.findByToken(token)
                    .orElse(null);

            if (resetToken == null) {
                log.warn("⚠️ Invalid reset token");
                return ResponseEntity.status(400).body(new MessageResponse(
                        "Invalid or expired reset link."
                ));
            }

            // Check if expired
            if (resetToken.isExpired()) {
                log.warn("⚠️ Expired reset token");
                return ResponseEntity.status(400).body(new MessageResponse(
                        "This reset link has expired. Please request a new one."
                ));
            }

            // Check if already used
            if (resetToken.isUsed()) {
                log.warn("⚠️ Reset token already used");
                return ResponseEntity.status(400).body(new MessageResponse(
                        "This reset link has already been used."
                ));
            }

            // Validate password strength
            if (newPassword.length() < 8) {
                return ResponseEntity.status(400).body(new MessageResponse(
                        "Password must be at least 8 characters long."
                ));
            }

            // Update password
            CustomUser user = resetToken.getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            // Mark token as used
            resetToken.setUsed(true);
            tokenRepository.save(resetToken);

            log.info("✅ Password reset successful for user: {}", user.getUsername());

            return ResponseEntity.ok(new MessageResponse(
                    "Password reset successful! You can now login with your new password."
            ));

        } catch (Exception e) {
            log.error("❌ Password reset failed", e);
            return ResponseEntity.status(500).body(new MessageResponse(
                    "Something went wrong. Please try again later."
            ));
        }
    }

    @GetMapping("/validate-reset-token")
    public ResponseEntity<TokenValidationResponse> validateToken(@RequestParam String token){

        PasswordResetToken resetToken = tokenRepository.findByToken(token).orElse(null);

        if(resetToken == null || resetToken.isExpired() || resetToken.isUsed()){
            return ResponseEntity.ok(new TokenValidationResponse(false, "Invalid or expired"));
        }

        return ResponseEntity.ok(new TokenValidationResponse(true , "Token is valid"));


    }


    @Data
    public static class ForgotPasswordRequest {
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        private String token;
        private String newPassword;
    }

    @Data
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }
    }

    @Data
    public static class TokenValidationResponse {
        private boolean valid;
        private String message;

        public TokenValidationResponse(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }
    }


}
