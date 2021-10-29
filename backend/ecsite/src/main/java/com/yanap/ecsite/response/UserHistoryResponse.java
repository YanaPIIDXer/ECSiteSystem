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
        private String userName;
        private String userAddress;
        private String dateTime;
        private int status;
    }

    @Getter
    private List<Info> list = new ArrayList<Info>();

    @Getter
    private int maxPage;

    @Getter
    private int countByPage;

    // コンストラクタ
    public UserHistoryResponse(int maxPage, int countByPage) {
        this.maxPage = maxPage;
        this.countByPage = countByPage;
    }

    // 追加
    public void add(long id, Product product, int count, String userName, String userAddress, String dateTime, int status) {
        Info info = new Info(id, product, count, userName, userAddress, dateTime, status);
        list.add(info);
    }
}
