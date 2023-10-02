<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<div id="session-info">
	<input type="hidden" id="postId" value="${postVO.postId}">
</div>
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
		<div class="user-info-wrapper">
			<div class="left-user-info" onclick="location.href='/user/${postVO.userId}'">
				<img src="${postVO.userImg}">
				<div>
					<strong>${postVO.userNickname}</strong>
					<p>${postVO.userHeight}cm  ${postVO.userForm}</p>
				</div>
			</div>
			<c:if test="${postVO.userId == sessionId}">
                <div class="post-delete-icon">
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                    </path>
                    </svg>
                </div>
            </c:if>
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
				<div class="post-pin ${product.pinType}" style="top:${product.pinY}%; left:${product.pinX}%;" onclick="moveToProduct('${product.productId}')">
					<p class="pin-brand">${product.productBrand}</p>
					<p class="pin-price">&#8361;<fmt:formatNumber value="${product.productPrice}" pattern="#,###"/></p>
					<p class="pin-size-color">${product.productColor}  ${product.productSize}</p>
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
        <div class="delete-loading-wrapper">
            <lord-icon
                id="loading-icon"
                src="https://cdn.lordicon.com/xjovhxra.json"
                trigger="loop"
                colors="primary:#d9d8d8,secondary:#08a88a"
                style="width:200px;height:100vh">
            </lord-icon>
        </div>
        <div class="delete-wrap">
            <div id="delete-box">
                <div id="title-wrap">
                    <p id="delete-title">
                        게시물을 삭제하시겠어요?
                    </p>
                    <p id="delete-subtitle">
                        삭제 버튼을 누르면 바로 삭제됩니다.
                        게시물을 삭제하면 복원할 수 없습니다.
                    </p>
                </div>
                <div id="border-line"></div>
                <button id="delete-btn" onclick="deleteOnePost(${postVO.postId})">삭제</button>
                <div id="border-line"></div>
                <button id="cancel-btn">취소</button>
            </div>
        </div>
		</div>
		<div class="post-content-wrapper">
			<div>
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
						<lord-icon
						    src="https://cdn.lordicon.com/udwhdpod.json"
						    colors="primary:#121331,secondary:#110a5c"
						    trigger="loop"
	   						delay="1000"
						    stroke="100"
						    style="width:30px;height:30px">
						</lord-icon>
					</button>
				</div>
				<p id="like-count-p" onclick= "moveToLike(${postVO.postId})"><strong id="like-count-strong">${postVO.likeCount}명</strong>이 좋아합니다</p>
			</div>
			<div class="post-content">
				<p class="post-content-date">
					<fmt:parseDate var="dateParse" pattern="yyyy-MM-dd HH:mm:ss" value="${postVO.postDate}"/>
					<fmt:formatDate var="date" pattern="yyyy-MM-dd" value="${dateParse}"/>
					<c:out value="${date}"/>
				</p>
				<p class="post-content-text">
					<strong onclick="location.href='/user/${postVO.userId}'">${postVO.userNickname}</strong>
					${postVO.postContent}
				</p>
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
				<strong onclick="location.href='/user/${postVO.userId}'">@${postVO.userNickname}</strong>
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
	<div id="likeListModal" class="modal">
		<div class="modal-content">
		    <div id="close-wrapper">
		    	<span class="close" id="none-display-btn">&times;</span>
		    	<p id="like-desc">좋아요를 누른 사람</p>
		    	<span class="close">&times;</span>
		    </div>
		    <div id="likeListContent"></div>
	    </div>
	</div>
</body>
<script src="/resources/js/postdetail.js"></script>
<script src="/resources/js/posting/like.js"></script>
</html>