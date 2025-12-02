package com.example.nobsv2.security;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Arrays;

import com.example.nobsv2.stripe.SubscriptionPlan;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name="custom_user")
@Data
@NoArgsConstructor
public class CustomUser {


    @Id
    @Column(name = "username")
    private String username;

    //NEW: email column
    @Column(unique = true, name = "email")
    @Email( message = "Invalid email format")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "roles")
    private String roles;

    //NEW subscription fields

    @Enumerated(EnumType.STRING)
    @Column
    private SubscriptionPlan subscriptionPlan = SubscriptionPlan.FREE;

    @Column(name = "stripe_customer_id")
    private String stripeCustomerId;

    @Column(name = "stripe_subscription_id")
    private String stripeSubscriptionId;

    @Column(name = "subscription_status")
    private String subscriptionStatus = "active"; //active , canceled, past_due

    //Usage tracking ----IMPORTANT----
    @Column(name = "searches_used")
    private int searchesUsed = 0;

    @Column(name = "websites_generated")
    private int websitesGenerated = 0;

    @Column(name = "messages_generated")
    private int messagesGenerated = 0;


    @Column(name = "usage_reset_date")
    private LocalDateTime usageResetDate;

    public CustomUser(String email , String username, String password, String roles) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    //helper method returing a list
    public List<String> getRoleList(){
        if(roles == null || roles.isBlank()) return List.of();
        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .toList();



    }


}
