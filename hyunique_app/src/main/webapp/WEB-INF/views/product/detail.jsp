<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${product.productName} | 현대를 입다 HYUNIQUE</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css"
	href="/resources/css/productdetail.css" />

</head>
<body>
	<div class="header-wrapper">
		<button onclick="backward()">
			<lord-icon
				id="backward-btn"
			    src="https://cdn.lordicon.com/zmkotitn.json"
			    trigger="click"
			    colors="primary:#121331"
			    style="transform: rotateY(180deg);
			">
			</lord-icon>
		</button>
	</div>
	<div class="content-wrapper">
		<div class="product-img-wrapper">
			<img src="${product.productImg}" class="product-img" />
		</div>
		<div class="product-content-wrapper">
			<div class="name-btn-wrapper">
				<p>${product.productName}</p>
				<button onclick="sharePost('${product.productName}')">
					<img src="/resources/img/ic-share.png" />
				</button>
			</div>
			<strong style="font-size: 1.2rem;"> &#8361; <fmt:formatNumber
					value="${product.productPrice}" pattern="#,###" />
			</strong>
			
			<div class="product-stock-wrapper">
				<p class="stock-title">현대백화점 재고 확인</p>
				<div class="select-depart-wrapper">
					<ul class="select-depart">
						<li id="select-depart-0">&nbsp;</li>
						<c:forEach var="depart" items="${product.storeList}">
							<li id='select-depart-${depart.storeId}'>${depart.storeName}</li>
						</c:forEach>
						<li>&nbsp;</li>
					</ul>
					<div class="fade-out"></div>
					<div class="fade-out-reverse"></div>
				</div>
				<c:forEach var="depart" items="${product.storeList}">
					<c:if test="${fn:length(depart.stockList) > 0}">
						<div class="stock-card-list-wrapper">
							<ul class="stock-card-list" id="card-list-${depart.storeId}">
								<c:forEach var="stock" items="${depart.stockList}">
									<c:choose>
										<c:when test="${stock.squantity > 0}">
											<li class="stock-card">
												<div class="grey-text">
													<p>${stock.productColor}</p>
													<p>${stock.productSize}</p>
												</div>
												<p class="stock-quantity">${stock.squantity}개</p>
											</li>
										</c:when>
										<c:otherwise>
											<li class="stock-card sold-out">
												<div class="grey-text">
													<p>${stock.productColor}</p>
													<p>${stock.productSize}</p>
												</div>
												<p class="stock-quantity">품절</p>
											</li>
										</c:otherwise>
									</c:choose>
								</c:forEach>
							</ul>
							<div class="fade-out-right"></div>
						</div>
					</c:if>
					<c:if test="${fn:length(depart.stockList) == 0}">
						<div class="stock-card-list" id="card-list-${depart.storeId}">
							<p class="no-stock-template">해당 매장에 재고가 없습니다.</p>
						</div>
					</c:if>
				</c:forEach>
			</div>
			
			<div class="product-post-wrapper">
				<p>이 아이템을 활용한 다양한 스타일</p>
				<div class="post-padding-wrapper">
					<div class="post-thumbnail-list-wrapper">
						<c:forEach var="thumbnail" items="${product.postThumbnailList}">
							<img src="${thumbnail.thumbnailUrl}"
								onclick="moveToPost('${thumbnail.postId}')" />
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>
	<button class="jw-btn jw-btn-fixed buy-btn"
		onclick="window.open('${product.productUrl}')">
		<img src="/resources/img/ic-buy.png"> 구매하기
	</button>
</body>
<script src="/resources/js/productdetail.js"></script>
</html>