/*
This connects to sql product repository and where they live
 */

package com.example.nobsv2.product;
import com.example.nobsv2.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    //spring data jpa

    List<Product> findByNameContaining(String name);

    //JPQL custom query-- finds a product in the db when descriprion is typed
    //everytime findByNameOrDescriptionContaining is called the String is the keyword that is ran through the data base
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Product> findByNameOrDescriptionContaining(@Param("keyword") String name);

}
