package com.example.nobsv2.security.dto;

import org.springframework.security.core.Authentication;

public record AuthResponse(String message, String accessToken){
    public AuthResponse(String message){
        this(message, null);
    }
}
