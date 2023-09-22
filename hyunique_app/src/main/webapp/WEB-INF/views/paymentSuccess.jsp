<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payment</title>
    <%@ include file="/WEB-INF/views/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="/resources/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/paymentSuccess.css" />
</head>
<body>
    <div id="wrapper">
        <div id="top-wrapper">
            <div id ="top-logo">
                <img src="/resources/img/hyunique.png" class="img-logo"/>
            </div>
            <div id ="top-comment">
             결제에 성공하였습니다!
            </div>
        </div>
        <hr>
        <div id="bottom-wrapper">
            <div id ="bottom-user-message">
                <div id="seller" class="name-content-box">
                    <div class="name">
                        결제 요청자
                    </div>
                    <div class="content">
                        Hyunique
                    </div>
                </div>
                <div id="buyer" class="name-content-box">
                    <div class="name">
                        구매자명
                    </div>
                    <div class="content">
                        ${userName}
                    </div>
                </div>
                <div id="purchase-date" class="name-content-box">
                    <div class="name">
                        결제 날짜
                    </div>
                    <div class="content">
                        ${confirmTime}
                    </div>
                </div>
            </div>
            <div id="bottom-confirm-message">
                <div id="purchase-number" class="name-content-box">
                    <div class="name">
                        주문번호
                    </div>
                    <div class="content">
                        <c:set var="orderId" value="${param.orderId}" />
                        ${orderId}
                        ${orderName}
                    </div>
                </div>
                <div id="purchase-detail">
                    <div class="purchase-product-list">
                    </div>
                    <c:set var="orderId" value="${orderId}"/>
                </div>
                <div id="purchase-number" class="name-content-box">
                                    <div class="name">
                                        상품총액
                                    </div>
                                    <div class="content">
                                        <c:set var="amount" value="${param.amount}" />
                                        ${amount}
                                    </div>
                </div>
            </div>
            <div class="button-container">
                        <button id="img-load-button" class="jw-btn jw-btn jw-btn-100" onclick="location.href='${url}'">홈으로</button>
                        <input type="file" id="fileInput" class="thumbnail-upload" style="display:none;" accept="image/*">
            </div>
        </div>
    </div>
</body>
<script src="/resources/js/payment.js">



                </script>
</html>