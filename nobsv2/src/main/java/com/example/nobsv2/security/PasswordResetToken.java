package com.example.nobsv2.security;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
/*
* TABLE FOR EXPIRATION TOKEN PER REQUEST
* */
@Entity
@Table(name = "password_reset_token")
@Data
@NoArgsConstructor
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne
    @JoinColumn(name = "username" , referencedColumnName = "username", nullable = false)
    private CustomUser user;

    @Column(nullable = false)
    private LocalDateTime expiryDate;


    @Column(nullable = false)
    private boolean used = false;

    public PasswordResetToken(String token , CustomUser user , LocalDateTime expiryDate){
        this.token = token;
        this.user = user;
        this.expiryDate = expiryDate;
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(expiryDate);
    }


}
