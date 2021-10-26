package com.yanap.ecsite.request;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Range;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 商品登録リクエスト
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddProductRequest {
    @NotBlank(message = "商品名を入力してください")
    private String name;

    @Range(min = 1, message = "値段は１円以上にしてください")
    private int price;

    private String imageUrl;

    @NotBlank(message = "商品概要を入力してください")
    private String description;
}
