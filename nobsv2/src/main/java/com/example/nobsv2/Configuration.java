package com.example.nobsv2;


import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@org.springframework.context.annotation.Configuration
public class Configuration {


    @Bean
    //beans get injected into spring container
    //gives us access to the rest template throughout the application
    public RestTemplate restTemplate(){

        //config rest template
        return new RestTemplate();
    }
}
