package com.example.intern.Entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "product", schema = "public")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String product_name;
    private Double price;
    private String explanation;

    @ManyToOne
    @JoinColumn(name="category_id",referencedColumnName = "id")
    private Category category;



    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}




