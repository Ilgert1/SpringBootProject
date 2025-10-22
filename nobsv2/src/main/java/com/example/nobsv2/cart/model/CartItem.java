package com.example.nobsv2.cart.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "cart_items")
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer productId;

    @Column(nullable = false)
    private Integer quantity;


    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public CartItem(String username, Integer productId, Integer quantity) {
        this.username = username;
        this.productId = productId;
        this.quantity = quantity;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }




}
