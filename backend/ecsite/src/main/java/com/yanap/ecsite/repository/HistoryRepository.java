package com.yanap.ecsite.repository;

import com.yanap.ecsite.entity.Histroy;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<Histroy, Long> {
}
