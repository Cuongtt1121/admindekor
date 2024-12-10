package com.example.dekorbacken.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(nullable = false, precision = 10, scale = 2) // Dùng DECIMAL với scale
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    private Float weight; // Không dùng precision hoặc scale

    @Column(name = "material_id")
    private Integer materialId;

    @Column(name = "color_id")
    private Integer colorId;

    @Column(length = 100)
    private String size;

    @Column(length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'available'")
    private String status;

    @Column(columnDefinition = "DOUBLE DEFAULT 0.0") // Không dùng scale
    private Double rating;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer sale;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}