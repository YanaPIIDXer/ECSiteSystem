package com.yanap.ecsite.controller;

import com.yanap.ecsite.request.UserRegisterRequest;
import com.yanap.ecsite.response.UserRegisterResponse;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// ユーザコントローラ
@RestController
@RequestMapping("/user")
public class UserController {
    @PostMapping("/register")
    public UserRegisterResponse register(@Validated UserRegisterRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new UserRegisterResponse(false, result.getAllErrors().get(0).getDefaultMessage());
        }
        return new UserRegisterResponse(true, "");
    }
}
