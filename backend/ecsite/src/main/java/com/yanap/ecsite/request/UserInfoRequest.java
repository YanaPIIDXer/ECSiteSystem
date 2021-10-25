package com.yanap.ecsite.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// ユーザ関係リクエスト
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoRequest {
    @NotBlank(message = "名前を入力してください")
    private String name;

    @NotBlank(message = "メールアドレスを入力してください")
    @Email(message = "メールアドレスの形式が不正です")
    private String email;

    @NotBlank(message = "パスワードを入力してください")
    private String password;

    @NotBlank(message = "住所を入力してください")
    private String address;

    private String token;
}
