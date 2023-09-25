package com.kosa5.hyunique.payment.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PaymentMapper {

    //오더 아이디 만드는 매퍼
    int insertPurchaseHistory(String orderId);
    //오더 아이디와 해당하는 상품리스트를 만드는 매퍼g
    int insertPurchaseProduct(String orderId);
}
