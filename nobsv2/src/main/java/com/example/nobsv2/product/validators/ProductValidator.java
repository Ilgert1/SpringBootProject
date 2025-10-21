package com.example.nobsv2.product.validators;

import com.example.nobsv2.exceptions.ErrorMessages;
import com.example.nobsv2.exceptions.ProductNotValidException;
import com.example.nobsv2.product.model.Product;
import com.mysql.cj.util.StringUtils;

public class ProductValidator {

    private ProductValidator() {

    }
/*
simply validates the data to make sure it is not bs
 */
    public static void execute(Product product) throws ProductNotValidException {
        if(StringUtils.isEmptyOrWhitespaceOnly(product.getName())){
            throw new ProductNotValidException(ErrorMessages.NAME_REQUIRED.getMessage());
        }

        if(product.getDescription().length() < 20){
            throw new ProductNotValidException(ErrorMessages.DESCRIPTION_LENGTH.getMessage());
        }

        if(product.getPrice() == null || product.getPrice() < 0){
            throw new ProductNotValidException(ErrorMessages.PRICE_CANNOT_BE_NEGATIVE.getMessage());
        }
    }
}
