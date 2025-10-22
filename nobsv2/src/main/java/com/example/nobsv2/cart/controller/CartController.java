package com.example.nobsv2.cart.controller;



import com.example.nobsv2.cart.model.CartItem;
import com.example.nobsv2.cart.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@PreAuthorize("hasAnyRole('BASIC' , 'SUPERUSER')")
public class CartController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<CartItem> addToCart(
            @RequestBody AddToCartRequest request,
            Authentication authentication
            ){
        String username = authentication.getName();
        CartItem item = cartService.addtoCart(username, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(item);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Authentication authentication){
        String username = authentication.getName();
        List<CartItem> cartItems = cartService.getCart(username);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Integer productId,
            Authentication authentication){
        String username = authentication.getName();
        cartService.removeFromCart(username, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication){
        String username = authentication.getName();
        cartService.clearCart(username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Void> updateQuantity(
            @PathVariable Integer productId,
            @RequestBody UpdateQuantityRequest request,
            Authentication authentication
    ){
        String username = authentication.getName();
        cartService.updateQuantity(username, productId, request.getQuantity());
        return ResponseEntity.noContent().build();
    }




}
