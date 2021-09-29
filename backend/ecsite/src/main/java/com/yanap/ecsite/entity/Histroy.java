package com.yanap.ecsite.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

// 注文履歴エンティティ
@Data
@Entity
@Table(name = "histories")
@NoArgsConstructor
public class Histroy {
    public static final int STATUS_PENDING = 0;
    public static final int STATUS_SHIPPED = 1;
    public static final int STATUS_CANCELED = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    private User user;

    @OneToOne
    private Product product;

    private int count;

    private LocalDateTime dateTime;

    private int status;
}
