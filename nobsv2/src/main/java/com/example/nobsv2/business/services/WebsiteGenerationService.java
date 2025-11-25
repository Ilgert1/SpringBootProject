package com.example.nobsv2.business.services;

import com.example.nobsv2.ai.service.ClaudeApiService;
import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.repository.BusinessRepository;
import com.example.nobsv2.stripe.StripeService;
import com.example.nobsv2.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebsiteGenerationService {

    private final ClaudeApiService claudeApiService;
    private final BusinessRepository businessRepository;
    private final UpdateBusinessService updateBusinessService;
    private final UserService userService;
    private final StripeService stripeService;

    @Transactional
    public WebsiteGenerationResult generateWebsite(Integer businessId) {
        try {
            // GET CURRENT USER
            String username = userService.getCurrentUsername();

            // CHECK SUBSCRIPTION LIMIT BEFORE GENERATING
            if (!stripeService.canPerformAction(username, StripeService.ActionType.GENERATE_WEBSITE)) {
                log.warn("⚠️ User {} reached website generation limit", username);
                WebsiteGenerationResult limitResult = new WebsiteGenerationResult();
                limitResult.setBusinessId(businessId);
                limitResult.setSuccess(false);
                limitResult.setErrorMessage("Website generation limit reached. Please upgrade your plan to continue.");
                return limitResult;
            }

            Business business = businessRepository.findById(businessId)
                    .orElseThrow(() -> new RuntimeException("Business not found"));

            log.info("Generating website for business: {}", business.getName());

            String prompt = buildWebsitePrompt(business);
            String systemPrompt = buildSystemPrompt();

            // Generate with Claude
            String generatedCode = claudeApiService.generateContent(prompt, systemPrompt);
            log.info("✅ Generated code length: {} characters", generatedCode.length());

            // Extract the React component code
            String cleanCode = extractCode(generatedCode);
            log.info("✅ Cleaned code length: {} characters", cleanCode.length());
            log.info("🔍 First 100 chars of clean code: {}", cleanCode.substring(0, Math.min(100, cleanCode.length())));

            // Save the code to database
            String previewUrl = "https://springbootproject-production-9187.up.railway.app/api/businesses/" + businessId + "/render";

            log.info("💾 About to save - businessId: {}, url: {}, codeLength: {}", businessId, previewUrl, cleanCode.length());
            Business updated = updateBusinessService.markWebsiteGenerated(businessId, previewUrl, cleanCode);
            log.info("✅ Saved! Generated code in DB: {}", updated.getGeneratedWebsiteCode() != null ? "YES" : "NO");

            // INCREMENT USAGE COUNTER (only after successful generation)
            stripeService.incrementUsage(username, StripeService.ActionType.GENERATE_WEBSITE);
            log.info("✅ Incremented website generation count for user: {}", username);

            WebsiteGenerationResult result = new WebsiteGenerationResult();
            result.setBusinessId(businessId);
            result.setBusinessName(business.getName());
            result.setGeneratedCode(cleanCode);
            result.setSuccess(true);

            log.info("Website generated successfully for: {}", business.getName());

            return result;

        } catch (Exception e) {
            log.error("❌ Website generation failed", e);
            WebsiteGenerationResult errorResult = new WebsiteGenerationResult();
            errorResult.setBusinessId(businessId);
            errorResult.setSuccess(false);
            errorResult.setErrorMessage("Generation failed: " + e.getMessage());
            return errorResult;
        }
    }

    private String buildSystemPrompt() {
        return """
                You are an expert web developer specializing in creating beautiful, modern, 
                professional business websites using React and Tailwind CSS.
                
                Your task is to generate a complete, production-ready React component for a business website.
                
                Requirements:
                - Use modern React with functional components and hooks
                - Style exclusively with Tailwind CSS utility classes
                - Create a responsive, mobile-first design
                - Include these sections: Hero, About, Services/Products, Contact, Footer
                - Use a professional color scheme appropriate for the business type
                - Add smooth animations and transitions
                - Include social proof elements (reviews, ratings if available)
                - Make it conversion-optimized (clear CTAs)
                - Use Lucide React icons for visual elements
                - No external dependencies except React and Lucide icons
                - Return ONLY the React component code, no explanations
                - Use a default export
                """;
    }

    private String buildWebsitePrompt(Business business) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("Generate a complete, beautiful, professional React website component for this business:\n\n");
        prompt.append("Business Name: ").append(business.getName()).append("\n");

        if (business.getAddress() != null) {
            prompt.append("Address: ").append(business.getAddress()).append("\n");
        }

        if (business.getPhone() != null) {
            prompt.append("Phone: ").append(business.getPhone()).append("\n");
        }

        if (business.getRating() != null) {
            prompt.append("Rating: ").append(business.getRating()).append(" stars (").append(business.getTotalRatings()).append(" reviews)\n");
        }

        if (business.getTypes() != null) {
            String businessType = business.getTypes().split(",")[0];
            prompt.append("Business Type: ").append(businessType).append("\n");
        }

        prompt.append("\nCreate a stunning, modern website that:\n");
        prompt.append("1. Has a hero section with the business name and a compelling headline\n");
        prompt.append("2. Includes an about section describing what makes this business special\n");
        prompt.append("3. Shows services/products offered (infer based on business type)\n");
        prompt.append("4. Has a prominent contact section with phone and address\n");
        prompt.append("5. Displays the rating and reviews prominently\n");
        prompt.append("6. Uses colors and imagery appropriate for this type of business\n");
        prompt.append("7. Includes clear call-to-action buttons throughout\n");
        prompt.append("8. Is fully responsive and mobile-friendly\n\n");

        prompt.append("Return ONLY the React component code. Use this structure:\n");
        prompt.append("```jsx\n");
        prompt.append("import React from 'react';\n");
        prompt.append("import { Phone, MapPin, Star, Mail } from 'lucide-react';\n\n");
        prompt.append("export default function BusinessWebsite() {\n");
        prompt.append("  // Your component code here\n");
        prompt.append("}\n");
        prompt.append("```");

        return prompt.toString();
    }

    private String extractCode(String generatedContent) {
        // Remove markdown code blocks if present
        String code = generatedContent;

        if (code.contains("```jsx")) {
            code = code.substring(code.indexOf("```jsx") + 6);
            if (code.contains("```")) {
                code = code.substring(0, code.indexOf("```"));
            }
        } else if (code.contains("```")) {
            code = code.substring(code.indexOf("```") + 3);
            if (code.contains("```")) {
                code = code.substring(0, code.lastIndexOf("```"));
            }
        }

        return code.trim();
    }

    // Result object
    @lombok.Data
    public static class WebsiteGenerationResult {
        private Integer businessId;
        private String businessName;
        private String generatedCode;
        private String deployedUrl;
        private boolean success;
        private String errorMessage;
    }
}