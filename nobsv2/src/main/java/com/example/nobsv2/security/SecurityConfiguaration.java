package com.example.nobsv2.security;

import com.example.nobsv2.security.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguaration {

    private final JwtAuthenticationFilter jwtFilter;

    // Public endpoints that don't require authentication
    private static final String[] PUBLIC_ENDPOINTS = {
            "/auth/login",
            "/auth/refresh",
            "/health",
            "/createnewuser",
    };

    // Swagger/OpenAPI documentation endpoints
    private static final String[] SWAGGER_ENDPOINTS = {
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/v3/api-docs.yaml"
    };

    public SecurityConfiguaration(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    SecurityFilterChain chain(HttpSecurity http, CorsConfigurationSource corsSource) throws Exception {
        http.cors(cors -> cors.configurationSource(corsSource))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        .requestMatchers(SWAGGER_ENDPOINTS).permitAll()
                        .requestMatchers("/api/businesses/*/generated-code").permitAll()
                        .requestMatchers("/api/businesses/with-generated-website").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/api/businesses/with-generated-website").permitAll()
                        .requestMatchers("/api/leads/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/products/**").hasAnyRole("BASIC", "SUPERUSER")
                        .requestMatchers("/products/**", "/admin/**").hasRole("SUPERUSER")
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 1️ Explicit allowed origins (required for cookies)
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:3000",
                "https://*.vercel.app"  // This now works with wildcards
        ));

        // 2️ Allowed methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // 3️ Allowed headers
        config.setAllowedHeaders(List.of("Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"));

        // 4️ Allow credentials (cookies, auth headers)
        config.setAllowCredentials(true);

        // 5️⃣ Optional: expose headers if needed
        config.setExposedHeaders(List.of("Authorization", "Set-Cookie"));

        // Apply to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

}