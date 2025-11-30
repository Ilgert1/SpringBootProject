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
    private final TemplateSelectionService templateSelectionService;

    @Transactional
    public WebsiteGenerationResult generateWebsite(Integer businessId) {
        try {
            String username = userService.getCurrentUsername();

            if (!stripeService.canPerformAction(username, StripeService.ActionType.GENERATE_WEBSITE)) {
                log.warn("⚠️ User {} reached website generation limit", username);
                WebsiteGenerationResult limitResult = new WebsiteGenerationResult();
                limitResult.setBusinessId(businessId);
                limitResult.setSuccess(false);
                limitResult.setErrorMessage("Website generation limit reached. Please upgrade your plan.");
                return limitResult;
            }

            Business business = businessRepository.findById(businessId)
                    .orElseThrow(() -> new RuntimeException("Business not found"));

            log.info("🎨 Generating website for: {}", business.getName());

            // SELECT TEMPLATE
            TemplateSelectionService.TemplateType templateType =
                    templateSelectionService.selectTemplateForBusiness(business.getTypes());

            String templateCode = templateSelectionService.loadTemplate(templateType);

            // BUILD PROMPTS
            String prompt = buildPrompt(business, templateType, templateCode);
            String systemPrompt = buildSystemPrompt();

            // GENERATE
            String generatedCode = claudeApiService.generateContent(prompt, systemPrompt);
            String cleanCode = extractCode(generatedCode);

            // SAVE
            String previewUrl = "https://springbootproject-production-9187.up.railway.app/api/businesses/" + businessId + "/render";
            updateBusinessService.markWebsiteGenerated(businessId, previewUrl, cleanCode);

            // INCREMENT USAGE
            stripeService.incrementUsage(username, StripeService.ActionType.GENERATE_WEBSITE);

            WebsiteGenerationResult result = new WebsiteGenerationResult();
            result.setBusinessId(businessId);
            result.setBusinessName(business.getName());
            result.setGeneratedCode(cleanCode);
            result.setSuccess(true);

            log.info("✨ Website generated using {} template!", templateType);
            return result;

        } catch (Exception e) {
            log.error("❌ Generation failed", e);
            WebsiteGenerationResult errorResult = new WebsiteGenerationResult();
            errorResult.setBusinessId(businessId);
            errorResult.setSuccess(false);
            errorResult.setErrorMessage("Failed: " + e.getMessage());
            return errorResult;
        }
    }

    private String buildSystemPrompt() {
        return """
                You are an expert at customizing website templates with business information.
                
                RULES:
                - Keep ALL code exactly as written in the template
                                                             - Do NOT modify regex patterns or code logic
                                                             - Do NOT change \\d to d in regular expressions
                                                             - Keep phone number formatting exactly as in template
                                                             - ONLY replace placeholder text with actual business information
                                                             - Keep ALL styling, layout, and structure exactly as is
                                                             - Use plain JavaScript (no TypeScript types)
                                                             - Do NOT include "use client" directive
                
                Return ONLY the complete React component code.
                No explanations, no markdown, just raw code.
                """;
    }

    private String buildPrompt(Business business, TemplateSelectionService.TemplateType templateType, String templateCode) {
        return String.format("""
                Customize this %s template with business information:
                
                BUSINESS:
                - Name: %s
                - Type: %s
                - Address: %s
                - Phone: %s
                - Rating: %s ⭐ (%s reviews)
                
                TEMPLATE:
                %s
                
                TASK:
                1. Replace placeholder text with actual business info
                2. Infer 6-9 realistic services for this business type
                3. Create 2-3 believable customer testimonials
                4. Keep ALL styling and structure exactly as is
                5. Return the complete component with imports
                
                IMPORTANT: Do NOT change design, layout, or Tailwind classes!
                """,
                templateType,
                business.getName(),
                business.getTypes(),
                business.getAddress(),
                business.getPhone(),
                business.getRating() != null ? business.getRating() : "N/A",
                business.getTotalRatings() != null ? business.getTotalRatings() : "0",
                templateCode
        );
    }

    private String extractCode(String generatedContent) {
        String code = generatedContent;

        if (code.contains("```tsx")) {
            code = code.substring(code.indexOf("```tsx") + 6);
            if (code.contains("```")) {
                code = code.substring(0, code.indexOf("```"));
            }
        } else if (code.contains("```jsx")) {
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