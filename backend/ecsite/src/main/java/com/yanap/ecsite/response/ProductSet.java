package com.yanap.ecsite.response;

import com.yanap.ecsite.entity.Product;

import lombok.Getter;

public class ProductSet {
    @Getter
    private String name;
    @Getter
    private int price;
    @Getter
    private String imageUrl;
    @Getter
    private String description;
    @Getter
    private int count;

    public ProductSet(Product product, int count) {
        name = product.getName();
        price = product.getPrice();
        imageUrl = product.getImageUrl();
        description = product.getDescription();
        this.count = count;
    }
}
