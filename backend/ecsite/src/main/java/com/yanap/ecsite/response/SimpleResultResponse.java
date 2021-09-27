package com.yanap.ecsite.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 単純な結果（真偽値のみ）を返すレスポンス
@AllArgsConstructor
public class SimpleResultResponse {
    @Getter
    private boolean result;
}
