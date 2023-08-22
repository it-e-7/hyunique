<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName}</title>
</head>
<body>
	<img src="${product.productImg}" />
	<c:forEach var="depart" items="${product.storeList}">
		<h2>${depart.storeName}</h2>
		<c:forEach var="stock" items="${depart.stockList}">
			<p>${stock}</p>
		</c:forEach>
	</c:forEach>
</body>
</html>