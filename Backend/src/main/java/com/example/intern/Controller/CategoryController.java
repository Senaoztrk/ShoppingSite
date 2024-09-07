package com.example.intern.Controller;


import com.example.intern.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import com.example.intern.Entity.Category;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {



    @Autowired
    private CategoryRepository categoryRepository;



    @GetMapping("/getallcategories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @GetMapping("/getcategory/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @PostMapping("/createcategory")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/updatecategory/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        if (!categoryRepository.existsById(id)) {
            return null;
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    @DeleteMapping("/deletecategory/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }
}


