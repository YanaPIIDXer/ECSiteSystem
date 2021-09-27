package com.yanap.ecsite.controller;

import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.repository.ProductRepository;
import com.yanap.ecsite.request.AddProductRequest;
import com.yanap.ecsite.response.AddProductResponse;
import com.yanap.ecsite.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 管理者用コントローラ
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private ProductService productService;
    
    // 商品登録
    @PostMapping("/product/add")
    public AddProductResponse addProduct(@Validated AddProductRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new AddProductResponse(false, result.getAllErrors().get(0).getDefaultMessage());
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setDescription(request.getDescription());
        if (!productService.save(product)) { return new AddProductResponse(false, "商品登録に失敗しました"); }
        
        return new AddProductResponse(true, "");
    }
}
