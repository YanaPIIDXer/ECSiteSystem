package com.yanap.ecsite.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

// ユーザ情報レスポンス
// 情報更新ページアクセス時に使用
@AllArgsConstructor
public class UserInfoResponse {
    @Getter
    private String name;

    @Getter
    private String email;

    @Getter
    private String password;

    @Getter
    private String address;

    @Getter
    private String cardFinalNumber;
}
