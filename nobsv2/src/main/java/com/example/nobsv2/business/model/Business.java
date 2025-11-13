package com.example.nobsv2.business.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "businesses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String address;

    private String phone;

    @Column(length = 1000)
    private String website;  // "NO WEBSITE" if they don't have one

    private Double rating;

    private Integer totalRatings;

    @Column(unique = true, nullable = false)
    private String placeId;  // Google Places ID - unique identifier

    @Column(length = 500)
    private String types;  // Store as comma-separated: "restaurant,food,establishment"

    private String businessStatus;  // OPERATIONAL, CLOSED_TEMPORARILY, CLOSED_PERMANENTLY

    // For tracking our outreach
    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean contacted;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean websiteGenerated;

    @Column(length = 2000)
    private String generatedWebsiteUrl;  // URL to the AI-generated website

    @Column(length = 1000)
    private String notes;  // For tracking conversations, follow-ups, etc.

    @Enumerated(EnumType.STRING)
    private LeadStatus leadStatus = LeadStatus.NEW;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Helper method to check if business needs a website
    public boolean needsWebsite() {
        return website == null ||
                website.equalsIgnoreCase("NO WEBSITE") ||
                website.trim().isEmpty();
    }

    // Enum for lead status tracking
    public enum LeadStatus {
        NEW,              // Just imported from crawler
        QUALIFIED,        // We verified they need a website
        CONTACTED,        // We reached out
        INTERESTED,       // They responded positively
        DEMO_SENT,        // We sent them a demo website
        CONVERTED,        // They became a customer!
        NOT_INTERESTED,   // They declined
        NO_RESPONSE       // They didn't respond
    }
}