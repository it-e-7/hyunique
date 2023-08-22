<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName}</title>

<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/productdetail.css" />
	
</head>
<body>
	<img src="${product.productImg}" />
	<c:forEach var="depart" items="${product.storeList}">
		<h2>${depart.storeName}</h2>
		<ul class="stock-card-list">
		<c:forEach var="stock" items="${depart.stockList}">
				<li class="stock-card">
					<p>${stock.productColor}</p>
					<p>${stock.productSize}</p>
					<p>${stock.squantity}</p>
				</li>
		</c:forEach>
		</ul>
	</c:forEach>
</body>
</html>