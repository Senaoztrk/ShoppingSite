package com.example.intern.Repository;
import com.example.intern.Entity.Product;



import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
