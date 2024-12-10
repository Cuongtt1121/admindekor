package com.example.dekorbacken.service;


import com.example.dekorbacken.entity.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(Product product);

    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product updateProduct(Long id, Product updatedProduct);

    boolean deleteProduct(Long id);
}
