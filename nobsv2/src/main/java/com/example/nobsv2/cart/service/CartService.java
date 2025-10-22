package com.example.nobsv2.cart.service;

import com.example.nobsv2.cart.model.CartItem;
import com.example.nobsv2.cart.repository.CartRepository;
import com.example.nobsv2.exceptions.ErrorMessages;
import com.example.nobsv2.exceptions.InvalidQuantityException;
import com.example.nobsv2.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartService {
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;


    public CartService(ProductRepository productRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    public CartItem addtoCart(String username , Integer productId, Integer quantity) {
        if(quantity <= 0) {
            throw new InvalidQuantityException(ErrorMessages.QUANTITY_CANNOT_BE_NEGATIVE.getMessage());
        }

        // we increase the quantity if the item already exists in the db
        var existing = cartRepository.findByUsernameAndProductId(username, productId);
        if(existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            item.setUpdatedAt(LocalDateTime.now());
            return cartRepository.save(item);
        }
        //Add new item
        CartItem item = new CartItem(username, productId, quantity);
        return cartRepository.save(item);
    }

    public List<CartItem> getCart(String username) {
        return cartRepository.findByUsername(username);
    }

    @Transactional
    public void clearCart(String username) {
        cartRepository.deleteByUsername(username);
    }
    @Transactional
    public void removeFromCart(String username, Integer productId) {
        cartRepository.deleteByUsernameAndProductId(username, productId);
    }

    public void updateQuantity(String username, Integer productId, Integer quantity) {
        if(quantity <= 0) {
            removeFromCart(username, productId);
            return;
        }
        var item = cartRepository.findByUsernameAndProductId(username, productId);
        if(item.isPresent()) {
            CartItem cartItem = item.get();
            cartItem.setQuantity(quantity);
            cartItem.setUpdatedAt(LocalDateTime.now());
            cartRepository.save(cartItem);
        }
    }

}
