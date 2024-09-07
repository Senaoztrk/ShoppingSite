package com.example.intern.Controller;
import com.example.intern.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import com.example.intern.Entity.Product;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/getallproduct")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/getproduct/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @PostMapping("/createproduct")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/updateproduct/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        if (!productRepository.existsById(id)) {
            return null;
        }
        product.setId(id);
        return productRepository.save(product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }



}


