package com.example.intern.Service;

import com.example.intern.Repository.CategoryRepository;
import org.springframework.stereotype.Service;
import com.example.intern.Entity.Category;

import java.util.List;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllList(){
        return categoryRepository.findAll();
    }
}
