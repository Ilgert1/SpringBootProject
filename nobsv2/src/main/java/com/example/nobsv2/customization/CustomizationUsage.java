package com.example.nobsv2.customization;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "customization_usage")
@Data
@NoArgsConstructor
public class CustomizationUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer businessId;

    @Column(nullable = false)
    private Integer messagesUsed = 0;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public CustomizationUsage(String username, Integer businessId, Integer messagesUsed) {
        this.username = username;
        this.businessId = businessId;
        this.messagesUsed = messagesUsed;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}