<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/product.css" />
<title>대시보드</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="backoffice-qr-container">
			<p class="dashboard-title margin-title">HOT 상품</p>
			<p class="backoffice-description">
				게시글에 태그된 횟수, 해당 게시물의 인기를 종합적으로 평가합니다 
			</p>
			<p class="backoffice-description">
				마케팅, 판매 전략 등에 이용할 수 있습니다 
			</p>
			<div class="backoffice-product-container">
				<div class="product-dashboard-button-wrapper">
						<button id="1d-btn" class="filter-btn" onclick="getProductData(1)">1일</button>
						<button id="7d-btn" class="filter-btn filter-btn-selected" onclick="getProductData(7)">1주</button>
						<button id="30d-btn" class="filter-btn" onclick="getProductData(30)">1달</button>
						<button id="90d-btn" class="filter-btn" onclick="getProductData(90)">3달</button>
				</div>
				<ul class="backoffice-product-list">
					<li>
						<div class="simple-wrapper">
							<p class="bold-p">순위</p>
							<p class="bold-p" style="width: 420px;padding-left: 21px;">제품</p>
						</div>
						<p class="bold-p">대표 게시물</p>
						<div class="simple-wrapper">
							<p class="bold-p">&#128147; 갯수</p>
							<p class="bold-p">태그 횟수</p>
						</div>
					</li>
				<c:forEach var="product" items="${productList}" varStatus="status">
					<li>
						<div class="simple-wrapper hover-wrapper" onclick="location.href = '/product/${product.productId}'">
							<p class="product-rank">${status.index + 1}</p>
							<img src="${product.productImg}">
							<div class="product-inform-wrapper">
								<p>${product.productBrand }</p>
								<p>${product.productName }</p>
							</div>
						</div>
						<div class="simple-wrapper hover-wrapper" onclick="location.href = '/post/${product.postId}'">
							<img src="${product.thumbnailUrl }">
							<p class="user-nickname">${product.userNickname }</p>
						</div>
						<div class="simple-wrapper">
							<p class="bold-p like-p">${product.totalLike }</p>
							<p class="bold-p tag-p">${product.totalTag }</p>
						</div>
					</li>
				</c:forEach>
				</ul>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/backoffice/product.js"></script>
</html>