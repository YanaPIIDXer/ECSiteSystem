package com.yanap.ecsite.service;

import java.util.List;

import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 商品サービス
@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public boolean save(Product product) {
        boolean result = false;
        try {
            result = (repository.save(product) != null);
        } catch (Exception e) { return false; }
        return result;
    }

    public Product get(long id) {
        return repository.getById(id);
    }
    
    // TODO:ページネーションを考える
    public List<Product> searchByKeyword(String keyword) {
        return repository.searchByKeyword(keyword);
    }
}
