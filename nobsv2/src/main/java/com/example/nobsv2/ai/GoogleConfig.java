package com.example.nobsv2.ai;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class GoogleConfig {

    @Value("${google.api.key}")
    private String googleApiKey;

}