package com.example.nobsv2.business.services;

import com.example.nobsv2.ai.service.ClaudeApiService;
import com.example.nobsv2.stripe.StripeService;
import com.example.nobsv2.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageGenerationService {

    private final ClaudeApiService claudeApiService;
    private final UserService userService;
    private final StripeService stripeService;

    public String generateOutreachMessage(
            String businessName,
            String businessType,
            String address) {

        // GET CURRENT USER
        String username = userService.getCurrentUsername();

        // CHECK SUBSCRIPTION LIMIT BEFORE GENERATING
        if (!stripeService.canPerformAction(username, StripeService.ActionType.GENERATE_MESSAGE)) {
            log.warn("⚠️ User {} reached message generation limit", username);
            throw new RuntimeException("Message generation limit reached. Please upgrade your plan to continue.");
        }

        log.info("Generating outreach message for: {}", businessName);

        String prompt = buildOutreachPrompt(businessName, businessType, address);
        String systemPrompt = buildSystemPrompt();

        String message = claudeApiService.generateContent(prompt, systemPrompt);

        // INCREMENT USAGE COUNTER (only after successful generation)
        stripeService.incrementUsage(username, StripeService.ActionType.GENERATE_MESSAGE);
        log.info("✅ Incremented message generation count for user: {}", username);

        log.info("✅ Outreach message generated for: {}", businessName);

        return message;
    }

    private String buildSystemPrompt() {
        return """
                You are a professional sales copywriter specializing in warm, 
                personalized outreach for local businesses.
                
                Your messages are:
                - Conversational and human
                - Value-focused (not pushy)
                - Brief and to the point
                - Action-oriented with clear next steps
                """;
    }

    private String buildOutreachPrompt(String businessName, String businessType, String address) {
        return String.format("""
                Write a professional, friendly outreach message to %s, a %s located at %s.
                
                Context: We've created a free professional website for their business 
                because we noticed they don't have one yet.
                
                The message should:
                - Be warm and personal (not salesy or robotic)
                - Mention we noticed they don't have a website
                - Explain we built one as a demo to show what's possible
                - Emphasize this is free with no obligation
                - Invite them to view it
                - Keep it under 150 words
                - Include a clear call-to-action
                - Sound human and conversational
                
                Write ONLY the message body. No subject line, no formal greetings 
                like "Dear [Name]", no signatures. Start directly with the message content.
                
                Example tone: "Hi! I came across your business and noticed you don't 
                have a website yet..."
                """, businessName, businessType, address);
    }
}