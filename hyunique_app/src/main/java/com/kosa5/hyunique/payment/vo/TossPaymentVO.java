package com.kosa5.hyunique.payment.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TossPaymentVO {

    @NonNull
    private String paymentKey; // 결제 고유 키
    @NonNull
    private String orderId; // 주문 고유 번호
    @NonNull
    private Number amount; // 결제 금액


}
