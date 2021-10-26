package com.yanap.ecsite.response;

import java.util.List;

import com.yanap.ecsite.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 商品リストレスポンス
@AllArgsConstructor
public class ProductListResponse {
    @Getter
    private List<Product> list;

    @Getter
    private int count;
}
