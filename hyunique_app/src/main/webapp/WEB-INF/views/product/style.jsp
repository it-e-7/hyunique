<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName}</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/productstyle.css" />

</head>
<body>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/hyunique/resources/img/ic-backward.png" />
		</button>
	</div>
	<div class="">
		<div class="product-wrapper" onclick="moveToProduct('${product.productId}')">
			<img src="${product.productImg}" />
			<div>
				<strong>${product.productBrand}</strong>
				<p class="product-item-name">${product.productName}</p>
				<p class="product-item-price">
					&#8361;
					<fmt:formatNumber value="${product.productPrice}" pattern="#,###" />
				</p>
			</div>
		</div>
		<p>이 아이템을 활용한 다양한 스타일</p>
		<div class="post-thumbnail-list-wrapper"></div>
	</div>

</body>
<script src="/hyunique/resources/js/productstyle.js"></script>
</html>