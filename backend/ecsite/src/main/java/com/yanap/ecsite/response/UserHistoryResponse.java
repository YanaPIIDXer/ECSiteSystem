package com.yanap.ecsite.response;

import java.util.ArrayList;
import java.util.List;

import com.yanap.ecsite.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

public class UserHistoryResponse {
    @Data
    @AllArgsConstructor
    public class Info {
        private long id;
        private Product product;
        private int count;
        private String dateTime;
        private int status;
    }

    @Getter
    private List<Info> list = new ArrayList<Info>();

    // 追加
    public void add(long id, Product product, int count, String dateTime, int status) {
        Info info = new Info(id, product, count, dateTime, status);
        list.add(info);
    }
}
