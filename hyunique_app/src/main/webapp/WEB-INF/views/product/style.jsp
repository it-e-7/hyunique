<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName}의 스타일링</title>
<%@ include file="/WEB-INF/views/common.jsp"%>

</head>
<body>
	<div id="main-wrapper">
	<%@ include file="/WEB-INF/views/header.jsp"%>
	</div>
	
	<div class="product-container">
		<div class="product-wrapper" onclick="moveToProduct('${product.productId}')">
			<div class="product-img-container">
				<img src="${product.productImg}" />
				<p class="product-price">
					&#8361; <fmt:formatNumber value="${product.productPrice}" pattern="#,###" />
				</p>
			</div>
			<div style="width: 100%;">
				<p class="brand">${product.productBrand}</p>
				<p class="product-item-name-s">${product.productName}</p>
			</div>
		</div>
	</div>
	
	<div class="description-wrapper">
		<p class="brand-title"> 어떻게 입을지 고민된다면?</p>
		<p class="description">hyunique 피플의 스타일 확인하기</p>
	</div>
	
	<div class="content-wrapper">
		<div class="post-thumbnail-list-wrapper"></div>
	</div>

</body>
<link rel="stylesheet" type="text/css"
	href="/resources/css/productstyle.css" />
<script src="/resources/js/productstyle.js"></script>
</html>