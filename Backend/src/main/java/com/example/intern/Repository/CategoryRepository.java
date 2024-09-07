package com.example.intern.Repository;
import com.example.intern.Entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;



public interface CategoryRepository extends JpaRepository<Category, Long> {

}

