package com.yanap.ecsite.response;

import java.util.ArrayList;
import java.util.List;

import com.yanap.ecsite.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

public class UserHistoryResponse {
    @Data
    @AllArgsConstructor
    public class Info {
        private Product product;
        private int count;
        private int status;
    }

    private List<Info> list = new ArrayList<Info>();

    // 追加
    public void add(Product product, int count, int status) {
        Info info = new Info(product, count, status);
        list.add(info);
    }
}
