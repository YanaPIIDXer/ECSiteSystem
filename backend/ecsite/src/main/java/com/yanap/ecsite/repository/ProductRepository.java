package com.yanap.ecsite.repository;

import java.util.List;

import com.yanap.ecsite.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// 商品リポジトリ
public interface ProductRepository extends JpaRepository<Product, Long> {
    // キーワード検索
    @Query(value = "SELECT * FROM products WHERE name like %:keyword%", nativeQuery = true)
    public List<Product> searchByKeyword(@Param("keyword") String keyword);
}
