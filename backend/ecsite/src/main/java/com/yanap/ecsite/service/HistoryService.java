package com.yanap.ecsite.service;

import com.yanap.ecsite.entity.History;
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
}
