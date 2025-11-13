package com.example.nobsv2.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class ClaudeDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String model;

        @JsonProperty("max_tokens")
        private Integer maxTokens;

        private List<Message> messages;

        private String system;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Message {
        private String role; // "user" or "assistant"
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String id;
        private String type;
        private String role;
        private List<Content> content;
        private String model;

        @JsonProperty("stop_reason")
        private String stopReason;

        private Usage usage;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Content {
        private String type;
        private String text;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Usage {
        @JsonProperty("input_tokens")
        private Integer inputTokens;

        @JsonProperty("output_tokens")
        private Integer outputTokens;
    }
}