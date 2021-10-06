package com.yanap.ecsite.repository;

import com.yanap.ecsite.entity.History;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
}
