package com.yanap.ecsite.controller;

import com.yanap.ecsite.request.AddProductRequest;
import com.yanap.ecsite.response.AddProductResponse;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 管理者用コントローラ
@RestController
@RequestMapping("/admin")
public class AdminController {
    // 商品追加
    @PostMapping("/product/add")
    public AddProductResponse addProduct(@Validated AddProductRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new AddProductResponse(false, result.getAllErrors().get(0).getDefaultMessage());
        }
        
        return new AddProductResponse(true, "");
    }
}
