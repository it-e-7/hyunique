<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName}</title>

<script src="https://code.jquery.com/jquery-3.6.4.min.js"
	integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
	crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/productdetail.css" />
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/main.css" />
	
</head>
<body>
	<div class="product-img-wrapper">
		<img src="${product.productImg}" class="product-img" />
	</div>
	<p>${product.productName}</p>
	\<fmt:formatNumber value="${product.productPrice}" pattern="#,###"/>
	<br>
	
	<p>현대백화점 재고 확인</p>
	<select name="depart">
		<c:forEach var="depart" items="${product.storeList}">
			<option value='${depart.storeId}'>${depart.storeName}</option>
		</c:forEach>
	</select>
	<c:forEach var="depart" items="${product.storeList}">
		<c:if test="${fn:length(depart.stockList) > 0}">
		<ul class="stock-card-list" id="card-list-${depart.storeId}">
		<c:forEach var="stock" items="${depart.stockList}">
			<li class="stock-card">
				<p>${stock.productColor}</p>
				<p>${stock.productSize}</p>
				<p>${stock.squantity}</p>
			</li>
		</c:forEach>
		</ul>
		</c:if>
		<c:if test="${fn:length(depart.stockList) == 0}">
			<div class="stock-card-list" id="card-list-${depart.storeId}">
				<p>해당 매장에 재고가 없습니다.</p>
			</div>
		</c:if>
	</c:forEach>
	
	<p>이 아이템을 활용한 다양한 스타일</p>
</body>
<script src="/hyunique/resources/js/productdetail.js"></script>
</html>