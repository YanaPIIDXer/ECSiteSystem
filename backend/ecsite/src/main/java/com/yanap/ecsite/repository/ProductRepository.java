package com.yanap.ecsite.repository;

import com.yanap.ecsite.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

// 商品リポジトリ
public interface ProductRepository extends JpaRepository<Product, Long> {
}
