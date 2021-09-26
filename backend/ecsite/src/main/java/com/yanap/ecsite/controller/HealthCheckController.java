package com.yanap.ecsite.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Getter;

// ヘルスチェック用Controller
@RestController
public class HealthCheckController {
    public class Response {
        @Getter
        private String message;
        public Response() {
            this.message = "OK";
        }
    }

    @RequestMapping("/")
    public Response index() {
        return new Response();
    }
}
