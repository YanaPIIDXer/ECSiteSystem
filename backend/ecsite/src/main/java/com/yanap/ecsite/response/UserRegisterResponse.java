package com.yanap.ecsite.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

// ユーザ登録レスポンス
@AllArgsConstructor
public class UserRegisterResponse {
    @Getter
    private boolean result;

    @Getter
    private String errorMessage;
}
