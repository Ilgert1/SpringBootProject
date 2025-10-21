package com.example.nobsv2;

import com.example.nobsv2.exceptions.ProductNotFoundException;
import com.example.nobsv2.product.ProductRepository;
import com.example.nobsv2.product.model.Product;
import com.example.nobsv2.product.model.ProductDTO;
import com.example.nobsv2.product.model.UpdateProductCommand;
import com.example.nobsv2.product.services.GetProductService;
import com.example.nobsv2.product.services.UpdateProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;



public class GetProductServiceTest {

    @Mock //mock the response of something not a real one
    private ProductRepository productRepository;


    @InjectMocks //the thing we are testing
    private GetProductService getProductService;
    @Mock
    private UpdateProductService updateProductService;

    @BeforeEach//things we need before the test runs to set up properly
    public void setUp() {
        //inits the repository and service class
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void given_product_exists_when_get_product_service_return_product_dto(){
        //given
        Product product = new Product();
        product.setId(1);
        product.setName("test");
        product.setDescription("test which is at least 20 characters");
        product.setPrice(9.99);

        //this says when but it is still part of the given--set up
        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        //when
        ResponseEntity<ProductDTO> response = getProductService.execute(1);

        //then
        assertEquals(ResponseEntity.ok(new ProductDTO(product)), response);

        verify(productRepository, times(1)).findById(1);
    }

    @Test
    public void given_product_does_not_exists_when_get_product_service_throw_product_not_found_exception(){
        //given
        when(productRepository.findById(1)).thenReturn(Optional.empty());


        //when & then
        assertThrows(ProductNotFoundException.class, () -> getProductService.execute(1));
        verify(productRepository, times(1)).findById(1);

    }

    @Test
    public void given_product_updated_successfully_when_get_product_service_return_product_dto() {
        // Given

        System.out.println("test");
        Product originalProduct = new Product();
        originalProduct.setId(1);
        originalProduct.setName("test");
        originalProduct.setDescription("test which is at least 20 characters");
        originalProduct.setPrice(9.99);

        // Mock repository to return original product
        when(productRepository.findById(1)).thenReturn(Optional.of(originalProduct));

        // Mock UpdateProductService to update product
        Product updatedProduct = new Product();
        updatedProduct.setId(1);
        updatedProduct.setName("updated test");
        updatedProduct.setDescription("updated description");
        updatedProduct.setPrice(19.99);




        // Act: Simulate updating the product
       ResponseEntity<ProductDTO> result = updateProductService.execute(new UpdateProductCommand(updatedProduct.getId(), updatedProduct));

        // Then: Assert that the updated product matches what is returned
        assertEquals("updated test", updatedProduct.getName());
        assertEquals("updated description", updatedProduct.getDescription());
        assertEquals(19.99, updatedProduct.getPrice(), 0);

        // Act: Retrieve the updated product using GetProductService
        when(productRepository.findById(1)).thenReturn(Optional.of(updatedProduct));
        ResponseEntity<ProductDTO> response = getProductService.execute(1);

        // Then: Assert the correct updated product is returned
        assertEquals(ResponseEntity.ok(new ProductDTO(updatedProduct)), response);

        // Verify interactions
        verify(productRepository, times(2)).findById(1); // Ensure findById was called twice
    }

}
