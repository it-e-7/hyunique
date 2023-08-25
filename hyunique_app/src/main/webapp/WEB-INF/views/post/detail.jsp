<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>스타일 상세보기</title>
<%@ include file="/WEB-INF/views/common.jsp" %>
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/postdetail.css" />
	
</head>
<body>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/hyunique/resources/img/ic-backward.png" />
		</button>
	</div>
	<div class="content-wrapper">
		<div class="user-info-wrapper">
			<div class="left-user-info">
				<img src="${postVO.userImg}">
				<div>
					<strong style="font-size: 1.2rem;">${postVO.userNickname}</strong>
					<p>${postVO.userHeight}cm</p>
				</div>
			</div>
			<c:choose>
				<c:when test="${postVO.follow == 0}">
					<button class="jw-btn-nonshadow follow-btn" onclick="follow(${postVO.userId})">팔로우</button>
				</c:when>
				<c:otherwise>
					<button class="jw-btn-selected">팔로잉</button>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="img-slider-container">
		<div class="img-slider-wrapper">
			<c:forEach var="url" items="${postVO.imgList}">
				<img src="${url}"/>
			</c:forEach>
			<button class="tag-btn">
				<img src="/hyunique/resources/img/ic-posttag.png"/>
			</button>
			
		</div>
		<c:if test="${fn:length(postVO.imgList) > 1}">
				<div class="img-index-bar">
					<c:forEach var="img" items="${postVO.imgList}" varStatus="status">
						<div class="img-index-circle" id="index-circle-${status.index}">
						</div>
					</c:forEach>
				</div>
			</c:if>
		</div>
		<div class="post-content-wrapper">
			<div class="post-low-btn">
			<button onclick="likeTogglePost(${postVO.postId})" class="like-btn">
				<c:choose>
					<c:when test="${postVO.styleLike == 0}">
						<img src="/hyunique/resources/img/ic-like.png"/>
					</c:when>
					<c:otherwise>
						<img src="/hyunique/resources/img/ic-like-selected.png"/>
					</c:otherwise>
				</c:choose>
			</button>
				<button onclick="sharePost('${postVO.userNickname}')">
					<img src="/hyunique/resources/img/ic-share.png"/>
				</button>
			</div>
			<div class="post-content">
				<p class="post-content-date">${postVO.postDate}</p>
				<span>
					<strong>${postVO.userNickname}</strong>
					<p>${postVO.postContent}</p>
				</span>
			</div>
			<div class="post-product">
				<p class="post-product-title">착용 제품</p>
				<ul class="product-list">
					<c:forEach var="product" items="${postVO.productList}">
						<li onclick="moveToProduct('${product.productId}')">
							<img src="${product.productImg}"/>
							<div>
								<strong>${product.productBrand}</strong>
								<p class="product-item-name">${product.productName}</p>
								<p class="product-item-price">
									&#8361;<fmt:formatNumber value="${product.productPrice}" pattern="#,###"/>
								</p>
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div class="post-tag">
				<p>연관 태그</p>
				<ul class="tag-list">
					<li>${postVO.seasonName}</li>
					<li>${postVO.tpoName}</li>
					<c:forEach var="tag" items="${postVO.styleTagList}">
						<li>${tag}</li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="post-product-post-wrapper">
			<span>
				<strong>@${postVO.userNickname}</strong>
				<p>님이 착용한 제품의 다른 스타일</p>
			</span>
			<div class="post-padding-wrapper">
				<div class="post-thumbnail-list-wrapper">
					<c:forEach var="thumbnail" items="${postVO.postThumbnailList}">
						<div onclick="moveToPost('${thumbnail.postId}')">
							<img src="${thumbnail.thumbnailUrl}" />
						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/ismobilejs@1/dist/isMobile.min.js"></script>
<script src="/hyunique/resources/js/postdetail.js"></script>
</html>