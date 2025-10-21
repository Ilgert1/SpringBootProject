/*
This class created a product with id name description and price
it also connects this product with the sql workbench already created
 */

package com.example.nobsv2.product.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity //maps java class to mySql
@Data
@Table(name ="product")

public class Product {

    @Id // all tables in mySql need a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto generates id
    @Column(name = "id")
    private Integer id;

    @NotNull(message = "Name is required")
    @Column(name = "name")
    private String name;

    @Size(min = 20 , message = "Description must be 20 characters long")
    @Column(name = "description")
    private String description;

    @PositiveOrZero(message = "Price cannot be negative ")
    @Column(name = "price")
    private Double price;

}
