package com.yanap.ecsite.service;

import java.util.List;

import com.yanap.ecsite.config.ApplicationConfig;
import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 商品サービス
@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    // 保存
    public boolean save(Product product) {
        boolean result = false;
        try {
            result = (repository.save(product) != null);
        } catch (Exception e) { return false; }
        return result;
    }

    // IDを指定して取得
    public Product get(long id) {
        return repository.getById(id);
    }
    
    // キーワード検索
    public List<Product> searchByKeywordWithPagenation(String keyword, int page) {
        return repository.searchByKeywordWithPagenation(keyword, (page - 1) * ApplicationConfig.PRODUCT_COUNT_BY_PAGE, ApplicationConfig.PRODUCT_COUNT_BY_PAGE);
    }
}
