package com.example.nobsv2.product;

import com.example.nobsv2.exceptions.ProductNotFoundException;
import com.example.nobsv2.product.model.ErrorResponse;
import com.example.nobsv2.product.model.Product;
import com.example.nobsv2.product.model.ProductDTO;
import com.example.nobsv2.product.model.UpdateProductCommand;
import com.example.nobsv2.product.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*@EnableMethodSecurity*/
@RestController
public class ProductController {
    private final CreateProductService createProductService;

    private final GetProductsService getProductsService;

    private final UpdateProductService updateProductService;

    private final DeleteProductService deleteProductService;

    private final GetProductService getProductService;

    private final SearchProductService searchProductService;

    public ProductController(CreateProductService createProductService,
                             GetProductsService getProductsService,
                             UpdateProductService updateProductService,
                             DeleteProductService deleteProductService,
                             GetProductService getProductService,
                             SearchProductService searchProductService) {

        this.createProductService = createProductService;
        this.getProductsService = getProductsService;
        this.updateProductService = updateProductService;
        this.deleteProductService = deleteProductService;
        this.getProductService = getProductService;
        this.searchProductService = searchProductService;
    }

/*
Different endpoints connected to postMan for testing
The "/..." determines the path variable the user inputs and then executes the services
ResponseEntity returns a response from the website which is later used
 */
    @PreAuthorize("hasAnyRole('SUPERUSER')")
    @PostMapping("/product")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody Product product) {
        return createProductService.execute(product);
    }

    @PreAuthorize("hasAnyRole('BASIC', 'SUPERUSER')")
    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getProducts(){
        return getProductsService.execute(null);
    }

    //new mapping to find by id

    @PreAuthorize("hasAnyRole('BASIC', 'SUPERUSER')")
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id){
        return getProductService.execute(id);
    }

    @PreAuthorize("hasAnyRole('BASIC', 'SUPERUSER')")
    @GetMapping("/product/search")
    public ResponseEntity<List<ProductDTO>> searchProductByName(@RequestParam String name){
        return searchProductService.execute(name);
    }

    @PreAuthorize("hasAnyRole('SUPERUSER')")
    @PutMapping("/product/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id, @RequestBody Product product){
        //need to pass in both id & product together thus UpdateProductCommand is used which takes two params and returns one
        return updateProductService.execute(new UpdateProductCommand(id , product));
    }

    @PreAuthorize("hasAnyRole('SUPERUSER')")
    @DeleteMapping("/product/{id}")//id here must match id
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id){
        return deleteProductService.execute(id);
    }


}
