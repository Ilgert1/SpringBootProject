package com.example.nobsv2.mappings;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
public interface CustomerRepository extends JpaRepository<Customer, Integer> {




}
