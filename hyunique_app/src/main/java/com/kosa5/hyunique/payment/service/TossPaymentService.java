package com.kosa5.hyunique.payment.service;

public interface TossPaymentService {
    String TossPurchaseService (int sessionId,int productTotalPrice);
    int insertPurchaseProduct(String productId, String orderId);
}
