package com.example.nobsv2.product.headers;


import com.example.nobsv2.product.model.Product;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeaderController {

    @GetMapping("/header")
    public String getRegionalResponse(@RequestHeader(required = false, defaultValue = "US") String region) {

        if (region.equals("US")) {
            return "BALD EAGLE FREEDOM";
        }
        if (region.equals("CAN")) {
            return "MAPLE SYRUP";
        }
        return "Country not supported";
    }

    @GetMapping(value = "/header/product" , produces = {MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<Product> getProduct(){
        Product product = new Product();
        product.setId(1);
        product.setName("Great Product num2");
        product.setDescription("Great Product num2 with a bunch of great details");
        return ResponseEntity.ok(product);
    }




}
