package com.example.nobsv2.stripe;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StripeCustomerInfoDto {
    private String id;
    private String email;
    private String subscriptionStatus; // e.g. active, past_due, canceled, none
}
