package com.kosa5.hyunique.payment.service;

import com.kosa5.hyunique.payment.vo.ProductInfoVO;

public interface TossPaymentService {
    String TossPurchaseService (int sessionId,int productTotalPrice);
    int insertPurchaseProduct(ProductInfoVO productInfoVO);
}
