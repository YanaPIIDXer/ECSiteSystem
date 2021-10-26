package com.yanap.ecsite.repository;

import java.util.List;

import com.yanap.ecsite.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// 商品リポジトリ
public interface ProductRepository extends JpaRepository<Product, Long> {
    // キーワード検索
    @Query(value = "SELECT * FROM products WHERE name LIKE %:keyword% or description LIKE %:keyword% LIMIT :pageBegin, :itemCount", nativeQuery = true)
    public List<Product> searchByKeywordWithPagenation(@Param("keyword") String keyword, @Param("pageBegin") int pageBegin, @Param("itemCount") int itemCount);

    // キーワードに引っかかる件数
    @Query(value = "SELECT count(*) FROM products WHERE name LIKE %:keyword% or description LIKE %:keyword%", nativeQuery = true)
    public int countByKeyword(@Param("keyword") String keyword);
}
