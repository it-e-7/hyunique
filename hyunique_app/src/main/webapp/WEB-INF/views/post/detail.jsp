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
					<button class="jw-btn-nonshadow" onclick="follow(22, ${postVO.userId})">팔로우</button>
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
			<button>
				<img src="/hyunique/resources/img/ic-like.png"/>
			</button>
			<button>
				<img src="/hyunique/resources/img/ic-share.png"/>
			</button>
			<br>
			<p>${postVO.postDate}</p>
			<p>${postVO.userNickname}</p>
			<p>${postVO.postContent}</p>
			<br>
			<p>착용 제품</p>
			<ul class="product-list">
				<c:forEach var="product" items="${postVO.productList}">
					<li onclick="moveToProduct('${product.productId}')">
						<img src="${product.productImg}"/>
						<div>
							<strong>${product.productBrand}</strong>
							<p>${product.productName}</p>
							<p>${product.productPrice}</p>
						</div>
					</li>
				</c:forEach>
			</ul>
			<br>
			<p>연관 태그</p>
			<ul class="tag-list">
				<li>${postVO.seasonName}</li>
				<li>${postVO.tpoName}</li>
				<c:forEach var="tag" items="${postVO.styleTagList}">
					<li>${tag}</li>
				</c:forEach>
			</ul>
		</div>
		<div>
			<p>${postVO.userNickname}님이 착용한 제품의 다른 스타일</p>
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
<script src="/hyunique/resources/js/postdetail.js"></script>
</html>