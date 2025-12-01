package com.example.nobsv2.business;

import com.example.nobsv2.business.services.WebsiteCustomizationService;
import com.example.nobsv2.stripe.StripeService;
import com.example.nobsv2.user.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/businesses/{businessId}/customize")
@RequiredArgsConstructor
@Slf4j
public class CustomizationController {

    private final WebsiteCustomizationService customizationService;
    private final UserService userService;
    private final StripeService stripeService;

    @PostMapping
    public ResponseEntity<CustomizationResponse> customizeWebsite(
            @PathVariable Integer businessId,
            @RequestBody CustomizationRequest request) {

        try {
            String username = userService.getCurrentUsername();
            log.info("🎨 Customization request from user: {} for business: {}", username, businessId);

            // Check if user's plan allows customization
            if (!stripeService.canCustomizeWebsite(username)) {
                log.warn("⚠️ User {} cannot customize - upgrade required", username);
                return ResponseEntity.status(403).body(
                        new CustomizationResponse(
                                false,
                                "🔒 Upgrade to Pro or Enterprise to customize websites with AI! This feature lets you change colors, fonts, text, and layout just by chatting.",
                                null,
                                0
                        )
                );
            }

            // Check customization message limit
            int messagesRemaining = stripeService.getCustomizationMessagesRemaining(username, businessId);
            if (messagesRemaining <= 0) {
                log.warn("⚠️ User {} has no customization messages remaining", username);
                return ResponseEntity.status(403).body(
                        new CustomizationResponse(
                                false,
                                "⚠️ You've used all your customization messages for this website. Upgrade to Enterprise for 50 customizations per website!",
                                null,
                                0
                        )
                );
            }

            // Perform customization - UPDATED to get explanation
            WebsiteCustomizationService.CustomizationResult result =
                    customizationService.customize(businessId, request.getMessage(), username);

            // Decrement message count
            stripeService.decrementCustomizationMessages(username, businessId);
            messagesRemaining--;

            log.info("✅ Customization successful for business: {}", businessId);

            // Return Claude's actual explanation
            return ResponseEntity.ok(new CustomizationResponse(
                    true,
                    result.getExplanation(), // Claude's friendly explanation
                    result.getUpdatedCode(),
                    messagesRemaining
            ));

        } catch (Exception e) {
            log.error("❌ Customization failed for business: {}", businessId, e);
            return ResponseEntity.status(500).body(
                    new CustomizationResponse(
                            false,
                            "😔 Sorry, something went wrong while updating your website. Could you try rephrasing your request? For example: 'Make the colors blue and white' or 'Change the hero text to be more energetic'.",
                            null,
                            0
                    )
            );
        }
    }

    @GetMapping("/remaining")
    public ResponseEntity<RemainingMessagesResponse> getRemainingMessages(@PathVariable Integer businessId) {
        try {
            String username = userService.getCurrentUsername();
            int remaining = stripeService.getCustomizationMessagesRemaining(username, businessId);
            boolean canCustomize = stripeService.canCustomizeWebsite(username);

            return ResponseEntity.ok(new RemainingMessagesResponse(remaining, canCustomize));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new RemainingMessagesResponse(0, false));
        }
    }

    @Data
    public static class CustomizationRequest {
        private String message;
    }

    @Data
    public static class CustomizationResponse {
        private boolean success;
        private String assistantMessage;
        private String updatedCode;
        private int messagesRemaining;

        public CustomizationResponse(boolean success, String assistantMessage, String updatedCode, int messagesRemaining) {
            this.success = success;
            this.assistantMessage = assistantMessage;
            this.updatedCode = updatedCode;
            this.messagesRemaining = messagesRemaining;
        }
    }

    @Data
    public static class RemainingMessagesResponse {
        private int remaining;
        private boolean canCustomize;

        public RemainingMessagesResponse(int remaining, boolean canCustomize) {
            this.remaining = remaining;
            this.canCustomize = canCustomize;
        }
    }
}