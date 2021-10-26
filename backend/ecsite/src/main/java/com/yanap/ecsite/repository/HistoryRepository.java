package com.yanap.ecsite.repository;

import java.util.List;

import com.yanap.ecsite.entity.History;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findBystatusIs(int status);
    List<History> findBystatusNot(int status);
}
