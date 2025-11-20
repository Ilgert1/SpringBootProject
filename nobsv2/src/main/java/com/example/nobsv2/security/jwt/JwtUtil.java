package com.example.nobsv2.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    // Defaults ensure the app still starts even if properties are missing
    @Value("${security.jwt.secret:CHANGE-ME-TO-32+BYTES-SECRET-KEY-1234567890abcd}")
    private String secret;

    @Value("${security.jwt.issuer:NoBS}")
    private String issuer;

    @Value("${security.jwt.audience:NoBS-frontend}")
    private String audience;

    @Value("${security.jwt.accessMinutes:30}")
    private long accessMinutes;

    @Value("${security.jwt.refreshDays:7}")
    private long refreshDays;

    private Key key;

    @PostConstruct
    void init() {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("security.jwt.secret must be at least 32 bytes");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getUsername())
                .claim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .setIssuer(issuer)
                .setAudience(audience)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(accessMinutes * 60)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getUsername())
                .setIssuer(issuer)
                .setAudience(audience + ":refresh")
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(refreshDays * 24 * 3600)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parse(String jwt) {
        // Use parserBuilder() with 0.11.5+
        return Jwts.parserBuilder()
                .requireIssuer(issuer)
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt);
    }

    /**
     * Extract username from token
     */
    public String extractUsername(String token) {
        try {
            Claims claims = parse(token).getBody();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Validate token for a given username
     */
    public boolean validateToken(String token, String username) {
        try {
            Claims claims = parse(token).getBody();
            String tokenUsername = claims.getSubject();
            Date expiration = claims.getExpiration();

            return tokenUsername.equals(username) && expiration.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Check if token is expired
     */
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = parse(token).getBody();
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }




}
