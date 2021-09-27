package com.yanap.ecsite.repository;

import com.yanap.ecsite.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
