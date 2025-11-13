package com.example.nobsv2.search.repository;

import com.example.nobsv2.product.model.Product;
import org.springframework.core.annotation.MergedAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContaining(String name);



}
