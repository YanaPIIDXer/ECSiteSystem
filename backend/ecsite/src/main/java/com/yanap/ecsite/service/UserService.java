package com.yanap.ecsite.service;

import com.yanap.ecsite.entity.User;
import com.yanap.ecsite.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// ユーザサービス
@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public boolean save(User user) {
        boolean result = false;
        try {
            result = (repository.save(user) != null);
        } catch (Exception e) { return false; }
        return result;
    }
}
