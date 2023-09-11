<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>스타일 상세보기</title>
<%@ include file="/WEB-INF/views/common.jsp" %>
<link rel="stylesheet" type="text/css"
	href="/resources/css/postdetail.css" />
	
</head>
<body>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/resources/img/ic-backward.png" />
		</button>
	</div>
	<div class="content-wrapper">
		<div class="user-info-wrapper">
			<div class="left-user-info" onclick="location.href='/user/${postVO.userId}'">
				<img src="${postVO.userImg}">
				<div>
					<strong>${postVO.userNickname}</strong>
					<p>${postVO.userHeight}cm</p>
				</div>
			</div>
			<c:if test="${sessionId != postVO.userId}">
				<c:choose>
					<c:when test="${postVO.follow == 0}">
						<button class="jw-btn-nonshadow" id="follow-btn" onclick="toggleFollow(${postVO.userId})">팔로우</button>
					</c:when>
					<c:otherwise>
						<button class="jw-btn-selected" id="follow-btn" onclick="toggleFollow(${postVO.userId})">팔로잉</button>
					</c:otherwise>
				</c:choose>
			</c:if>
		</div>
		<div class="img-slider-container">
		<div class="img-slider-wrapper">
			<c:forEach var="url" items="${postVO.imgList}">
				<img src="${url}"/>
			</c:forEach>
			<button class="tag-btn">
				<img src="/resources/img/ic-posttag.png"/>
			</button>
			<c:forEach var="product" items="${postVO.productList}">
				<div class="post-pin arrow-top" style="top:${product.pinY}%; left:${product.pinX}%;" onclick="moveToProduct('${product.productId}')">
					<p class="pin-brand">${product.productBrand}</p>
					<p class="pin-price">&#8361;<fmt:formatNumber value="${product.productPrice}" pattern="#,###"/></p>
					<p class="pin-size">${product.productColor}  ${product.productSize}</p>
				</div>
			</c:forEach>
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
						<img src="/resources/img/ic-like.png"/>
					</c:when>
					<c:otherwise>
						<img src="/resources/img/ic-like-selected.png"/>
					</c:otherwise>
				</c:choose>
			</button>
				<button onclick="sharePost('${postVO.userNickname}')">
					<img src="/resources/img/ic-share.png"/>
				</button>
			</div>
			<div class="post-content">
				<p class="post-content-date">
					<fmt:parseDate var="dateParse" pattern="yyyy-MM-dd HH:mm:ss" value="${postVO.postDate}"/>
					<fmt:formatDate var="date" pattern="yyyy-MM-dd" value="${dateParse}"/>
					<c:out value="${date}"/>
				</p>
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
								<span class="product-price-size-wrapper">
									<p class="product-item-price">
										&#8361;<fmt:formatNumber value="${product.productPrice}" pattern="#,###"/>
									</p>
									<p class="product-item-size">${product.productColor} ${product.productSize} 사이즈</p>
								</span>
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
<script src="/resources/js/postdetail.js"></script>
</html>