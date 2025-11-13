package com.example.nobsv2.ai;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class ClaudeConfig {

    @Value("${claude.api.key}")
    private String apiKey;

    @Value("${claude.api.url:https://api.anthropic.com/v1/messages}")
    private String apiUrl;

    @Value("${claude.model:claude-sonnet-4-20250514}")
    private String model;

    @Value("${claude.max.tokens:4000}")
    private Integer maxTokens;
}