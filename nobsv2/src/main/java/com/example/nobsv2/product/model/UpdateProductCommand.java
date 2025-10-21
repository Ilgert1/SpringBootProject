/*
This is for future use on product putting mapping since it requires Id and product
@param Id of product
@param Product
@Getter getter methods
 */

package com.example.nobsv2.product.model;

import lombok.Getter;


@Getter
public class UpdateProductCommand {
    private Integer id;
    private Product product;

    public UpdateProductCommand(Integer id, Product product) {
        this.id = id;
        this.product = product;
    }
}
