package com.kosa5.hyunique.payment.service;

import com.kosa5.hyunique.payment.mapper.PaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

public class TossPaymentService implements TossPayment{

    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    public String TossPurchaseService() {
        //무작위 숫자 만들기
        String orderId = randomGenerator();
        // 오더 아이디 만들어서 인서트 하기
        int insertcheck = paymentMapper.insertPurchaseHistory(orderId);
        return null;
    }


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
