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

<script src="https://code.jquery.com/jquery-3.6.4.min.js"
	integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
	crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/postdetail.css" />
<link rel="stylesheet" type="text/css"
	href="/hyunique/resources/css/main.css" />
	
</head>
<body>
	<div class="content-wrapper">
		<div class="user-info-wrapper">
			<div class="left-user-info">
				<img src="${postVO.userImg}">
				<div>
					<p>${postVO.userNickname}</p>
					<p>${postVO.userHeight}</p>
				</div>
			</div>
			<button>팔로우</button>
		</div>
		<div class="img-slider-wrapper">
			<c:forEach var="url" items="${postVO.imgList}">
				<img src="${url}"/>
			</c:forEach>
		</div>
		<div class="post-content-wrapper">
			<button>좋아요</button>
			<button>공유</button>
			<br>
			<p>${postVO.postDate}</p>
			<p>${postVO.userNickname}</p>
			<p>${postVO.postContent}</p>
			<br>
			<p>착용 제품</p>
			<ul class="product-list">
				<c:forEach var="product" items="${postVO.productList}">
					<li>
						<img src="${product.productImg}"/>
						<p>${product.productBrand}</p>
						<p>${product.productName}</p>
						<p>${product.productPrice}</p>
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
	</div>
</body>
<script src="/hyunique/resources/js/postdetail.js"></script>
</html>