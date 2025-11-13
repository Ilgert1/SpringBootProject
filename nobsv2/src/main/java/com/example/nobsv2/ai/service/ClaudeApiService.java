package com.example.nobsv2.ai.service;

import com.example.nobsv2.ai.ClaudeConfig;
import com.example.nobsv2.ai.dto.ClaudeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClaudeApiService {

    private final ClaudeConfig claudeConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    public String generateContent(String prompt, String systemPrompt) {
        try {
            // Build request
            ClaudeDTO.Message userMessage = ClaudeDTO.Message.builder()
                    .role("user")
                    .content(prompt)
                    .build();

            ClaudeDTO.Request request = ClaudeDTO.Request.builder()
                    .model(claudeConfig.getModel())
                    .maxTokens(claudeConfig.getMaxTokens())
                    .messages(Collections.singletonList(userMessage))
                    .system(systemPrompt)
                    .build();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-api-key", claudeConfig.getApiKey());
            headers.set("anthropic-version", "2023-06-01");

            HttpEntity<ClaudeDTO.Request> entity = new HttpEntity<>(request, headers);

            // Make API call
            log.info("Calling Claude API...");
            ResponseEntity<ClaudeDTO.Response> response = restTemplate.exchange(
                    claudeConfig.getApiUrl(),
                    HttpMethod.POST,
                    entity,
                    ClaudeDTO.Response.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                ClaudeDTO.Response responseBody = response.getBody();

                if (responseBody.getContent() != null && !responseBody.getContent().isEmpty()) {
                    String generatedText = responseBody.getContent().get(0).getText();
                    log.info("Claude API call successful. Tokens used - Input: {}, Output: {}",
                            responseBody.getUsage().getInputTokens(),
                            responseBody.getUsage().getOutputTokens());
                    return generatedText;
                }
            }

            throw new RuntimeException("Failed to get response from Claude API");

        } catch (Exception e) {
            log.error("Error calling Claude API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate content with Claude API", e);
        }
    }

    public String generateContent(String prompt) {
        return generateContent(prompt, null);
    }
}