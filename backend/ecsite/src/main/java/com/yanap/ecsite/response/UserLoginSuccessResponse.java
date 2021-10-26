package com.yanap.ecsite.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 一般ユーザがログインに成功した時のレスポンス
@AllArgsConstructor
public class UserLoginSuccessResponse {
    @Getter
    private String name;    
}
