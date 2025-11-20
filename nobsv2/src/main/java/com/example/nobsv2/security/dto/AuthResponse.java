package com.example.nobsv2.security.dto;

import org.springframework.security.core.Authentication;

public record AuthResponse(String status, String accessToken, String refreshToken){
    public AuthResponse(String status){
        this(status, null, null);
    }

    public AuthResponse(String status, String accessToken){
        this(status , accessToken,  null);
    }
}
