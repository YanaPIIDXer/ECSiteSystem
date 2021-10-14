package com.yanap.ecsite.service;

import java.util.HashMap;
import java.util.Map;

import com.stripe.exception.StripeException;
import com.stripe.model.Refund;
import com.yanap.ecsite.entity.History;
import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.repository.HistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository repository;

    // 保存
    public boolean save(History history) {
        boolean result = false;
        try {
            result = (repository.save(history) != null);
        } catch (Exception e) { result = false; }
        return result;
    }

    // キャンセル
    public boolean cancel(long id) {
        History history = repository.getById(id);
        if (history.getStatus() != History.STATUS_PENDING) { return false; }

        String chargeId = history.getChargeId();
        Map<String, Object> refundMap = new HashMap<>();
        refundMap.put("charge", chargeId);
        try {
            Refund.create(refundMap);
        } catch (StripeException e) { return false; }

        history.setStatus(History.STATUS_CANCELED);
        return save(history);
    }
}
