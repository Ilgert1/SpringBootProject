package com.example.nobsv2.cart.repository;

import com.example.nobsv2.cart.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByUsername(String username);
    Optional<CartItem> findByUsernameAndProductId(String username, Integer productId);
    void deleteByUsernameAndProductId(String username, Integer productId);
    void deleteByUsername(String username);
}