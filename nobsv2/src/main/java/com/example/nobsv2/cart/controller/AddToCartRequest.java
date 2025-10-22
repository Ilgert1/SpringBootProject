package com.example.nobsv2.cart.controller;

import lombok.Data;

@Data
public class AddToCartRequest {
    private Integer productId;
    private Integer quantity;
}
