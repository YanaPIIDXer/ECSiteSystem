package com.yanap.ecsite.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yanap.ecsite.auth.AuthUser;
import com.yanap.ecsite.response.UserLoginSuccessResponse;

import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.NoArgsConstructor;

// 一般ユーザがログインに成功したときに呼ばれるハンドラ
@NoArgsConstructor
public class UserLoginSuccessHandler implements AuthenticationSuccessHandler {
    private MappingJackson2HttpMessageConverter messageConverter;

    public UserLoginSuccessHandler(MappingJackson2HttpMessageConverter messageConverter) {
        this.messageConverter = messageConverter;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        AuthUser authUser = (AuthUser) authentication.getPrincipal();
        UserLoginSuccessResponse loginResponse = new UserLoginSuccessResponse(authUser.getUser().getName());

        HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
        messageConverter.write(loginResponse, MediaType.APPLICATION_JSON, outputMessage);
        
        response.setStatus(HttpStatus.OK.value());
    }
    
}
