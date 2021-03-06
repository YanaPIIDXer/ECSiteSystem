package com.yanap.ecsite.repository;

import com.yanap.ecsite.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// ユーザリポジトリ
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
