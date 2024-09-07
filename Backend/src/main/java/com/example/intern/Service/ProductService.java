package com.example.intern.Service;

import com.example.intern.Repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.example.intern.Entity.Product;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllList(){
        return productRepository.findAll();
    }
}
