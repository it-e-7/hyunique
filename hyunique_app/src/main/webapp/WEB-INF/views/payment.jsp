<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><!DOCTYPE html>
<html lang="ha">
<head>
    <meta charset="utf-8" />
    <title>결제하기 ${userId}</title>
    <!-- 토스페이먼츠 결제창 SDK 추가 -->
    <script src="https://js.tosspayments.com/v1/payment"></script>
    <script src="/resources/js/tossPayment.js"></script>
</head>
<body>
<section>
    <!--  충전하기 버튼 만들기  -->
    <span>총 포인트 충전 금액 :</span>
    <span>58500원</span>
    <button id="payment-button" onclick='paymentToss("test_ck_GePWvyJnrKbQvDkoy0RVgLzN97Eo", 101, "${url}")'>58500원 충전하기</button>
</section>
</body>
</html>