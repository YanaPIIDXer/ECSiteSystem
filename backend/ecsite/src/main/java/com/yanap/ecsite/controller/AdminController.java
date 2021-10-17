package com.yanap.ecsite.controller;

import java.util.List;

import com.yanap.ecsite.entity.History;
import com.yanap.ecsite.response.SimpleResultResponse;
import com.yanap.ecsite.service.HistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 管理者APIコントローラ
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private HistoryService historyService;

    // 発送待ちの注文リスト
    @RequestMapping("/order")
    public List<History> orderList()
    {
        return historyService.collectStatusIsPending();
    }

    // 発送
    @PostMapping("/order/send")
    public SimpleResultResponse sendOrder(@RequestParam("id") long id) {
        History history = historyService.find(id);
        if (history == null) { return new SimpleResultResponse(false); }

        history.setStatus(History.STATUS_SHIPPED);
        return new SimpleResultResponse(historyService.save(history));
    }

    // キャンセル
    @PostMapping("/order/cancel")
    public SimpleResultResponse cancelOrder(@RequestParam("id") long id) {
        History history = historyService.find(id);
        if (history == null) { return new SimpleResultResponse(false); }

        history.setStatus(History.STATUS_CANCELED);
        return new SimpleResultResponse(historyService.save(history));
    }
}
