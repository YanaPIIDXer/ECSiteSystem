package com.yanap.ecsite.response;

import java.util.ArrayList;
import java.util.List;

import com.yanap.ecsite.entity.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CartResponse {    
    @Getter
    private List<ProductSet> products = new ArrayList<ProductSet>();
    public void addProduct(Product product, int count) {
        products.add(new ProductSet(product, count));
    }
}
