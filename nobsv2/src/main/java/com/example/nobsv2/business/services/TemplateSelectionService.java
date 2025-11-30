package com.example.nobsv2.business.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class TemplateSelectionService {

    public enum TemplateType {
        LUXURY,
        LOCAL,
        CREATIVE,
        PROFESSIONAL,
        MODERN
    }

    public TemplateType selectTemplateForBusiness(String businessTypes) {
        if (businessTypes == null || businessTypes.isEmpty()) {
            return TemplateType.PROFESSIONAL;
        }

        String types = businessTypes.toLowerCase();

        // Luxury: High-end services
        if (types.contains("spa") || types.contains("salon") ||
                types.contains("jewelry") || types.contains("hotel") ||
                types.contains("luxury") || types.contains("boutique")) {
            log.info("✨ Selected LUXURY template");
            return TemplateType.LUXURY;
        }

        // Local: Community-focused businesses
        if (types.contains("restaurant") || types.contains("cafe") ||
                types.contains("bakery") || types.contains("bar") ||
                types.contains("food") || types.contains("store") ||
                types.contains("shop") || types.contains("market")) {
            log.info("🏘️ Selected LOCAL template");
            return TemplateType.LOCAL;
        }

        // Creative: Design and marketing agencies
        if (types.contains("marketing") || types.contains("design") ||
                types.contains("creative") || types.contains("advertising") ||
                types.contains("agency") || types.contains("media") ||
                types.contains("photography") || types.contains("art")) {
            log.info("🎨 Selected CREATIVE template");
            return TemplateType.CREATIVE;
        }

        // Modern: Tech and SaaS companies
        if (types.contains("tech") || types.contains("software") ||
                types.contains("saas") || types.contains("startup") ||
                types.contains("digital") || types.contains("web") ||
                types.contains("app") || types.contains("it")) {
            log.info("💻 Selected MODERN template");
            return TemplateType.MODERN;
        }

        // Professional: Default for services
        log.info("💼 Selected PROFESSIONAL template");
        return TemplateType.PROFESSIONAL;
    }

    public String loadTemplate(TemplateType templateType) {
        try {
            String filename = templateType.name().toLowerCase() + ".txt";
            ClassPathResource resource = new ClassPathResource("templates/" + filename);

            String templateCode = new String(
                    resource.getInputStream().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            log.info("✅ Loaded {} template ({} characters)", templateType, templateCode.length());
            return templateCode;

        } catch (IOException e) {
            log.error("❌ Failed to load template: {}", templateType, e);
            throw new RuntimeException("Template not found: " + templateType, e);
        }
    }
}