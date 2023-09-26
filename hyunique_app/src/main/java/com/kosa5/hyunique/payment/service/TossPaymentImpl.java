package com.kosa5.hyunique.payment.service;

import com.kosa5.hyunique.payment.mapper.PaymentMapper;
import com.kosa5.hyunique.payment.vo.ProductInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class TossPaymentImpl implements TossPaymentService {

    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    public String TossPurchaseService(int userId, int totalPrice) {
        //무작위 숫자 만들기
        String orderId = randomGenerator();
        // 오더 아이디 만들어서 인서트 하기
        int insertCheck = paymentMapper.insertPurchaseHistory(orderId,userId,totalPrice);
        if (insertCheck!=1){
            System.out.println("insertPurchaseHistory Error");
        }
        return orderId;
    }

    @Override
    public int insertPurchaseProduct(ProductInfoVO productInfoVO){
        int insertCheck = paymentMapper.insertPurchaseProduct(productInfoVO);
        if (insertCheck!=1){
            System.out.println("insertPurchaseProduct Error");
            return 0;
        }
        return 1;
    };

    private String randomGenerator()  {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int length = 10;

        StringBuilder randomString = new StringBuilder();// Random 객체 생성
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            char randomChar = characters.charAt(random.nextInt(characters.length()));
            randomString.append(randomChar);
        }
        return randomString.toString();
    }

}
