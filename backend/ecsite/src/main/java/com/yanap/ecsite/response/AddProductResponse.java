package com.yanap.ecsite.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 商品登録レスポンス
@AllArgsConstructor
public class AddProductResponse {
    @Getter
    private boolean result;
    
    @Getter
    private String errorMessage;
}
