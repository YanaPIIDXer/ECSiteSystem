package com.yanap.ecsite.controller;

import java.util.List;

import com.yanap.ecsite.entity.History;
import com.yanap.ecsite.service.HistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 管理者APIコントローラ
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private HistoryService historyService;

    // 発注待ちの注文リスト
    @RequestMapping("/order")
    public List<History> orderList()
    {
        return historyService.collectStatusIsPending();
    }
}
