package com.yanap.ecsite.controller;

import java.util.List;

import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.request.AddProductRequest;
import com.yanap.ecsite.response.AddProductResponse;
import com.yanap.ecsite.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 商品関係コントローラ
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    // 商品リスト取得
    // TODO:ページネーションの実装
    @RequestMapping("/product/list")
    public List<Product> list(@RequestParam(name = "keyword", required = false) String keyword, @RequestParam(name = "page", required = false) Integer page) {
        if (keyword == null) {
            keyword = "";
        }
        if (page == null) {
            page = 1;
        }
        return productService.searchByKeywordWithPagenation(keyword, page);
    }
    
    // 商品登録
    @PostMapping("/admin/product/add")
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
