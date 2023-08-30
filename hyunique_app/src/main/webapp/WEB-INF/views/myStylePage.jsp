<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css"
	href="/resources/css/userStyle.css" />

</head>
<body>
	<div id="session-info">
		<input type="hidden" id="session-id" value="${sessionId}">
	</div>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/resources/img/ic-backward.png" />
		</button>
		<div class="txt-user-profile">
			<p>${user.userNickname}</p>
		</div>
		<a href="update"> <img src="/resources/img/ic-settings.png"
			id="settings" />
		</a>
	</div>

	<!-- User Profile -->
	<div class="profile-section">
		<div class="img-backimg-wrapper">
			<img src="${user.userBackimg}" width="800" height="400">
		</div>
		<div class="img-userimg-wrapper">
			<img src="${user.userImg}" width="200" height="200">
		</div>
		<div class="user-details">
			<div class="user-detail-bar-wrapper">
				<p id="user-detail-title">팔로워 |</p>
				<p id="user-follower">${user.followerCount}</p>
			</div>
			<div class="user-detail-bar-wrapper">
				<p id="user-detail-title">스타일 |</p>
				<p id="user-follower">${user.styleNames}</p>
			</div>
			<div class="user-introduce-wrapper">${user.userIntroduce}</div>
			${user.facebookUrl} ${user.twitterUrl} ${user.instagramUrl}
		</div>
	</div>
	
<ul class="tab-bar">
    <li data-num="0" class="tab wave dark tab-button" data-tab-target="#tab1">스타일링</li>
    <li data-num="1" class="tab wave dark tab-button" data-tab-target="#tab2">옷장</li>
    <div class="indicator"></div>
</ul>

	<div id="tab1" class="tab-content">
		<button onclick="userPostList(${sessionId})">내 포스트</button>
		<div id="thumbnails"></div>
		<div id="postUrl"></div>
	</div>

	<div id="tab2" class="tab-content">
		<div class="button-section">
			<button onclick="filterProducts('bagList')">
				<img src="/resources/img/ic-bag.png" />
			</button>
			<button onclick="filterProducts('dressList')">
				<img src="/resources/img/ic-dress.png" />
			</button>
			<button onclick="filterProducts('bottomList')">
				<img src="/resources/img/ic-bottom.png" />
			</button>
			<button onclick="filterProducts('topList')">
				<img src="/resources/img/ic-top.png" />
			</button>
			<button onclick="filterProducts('outerList')">
				<img src="/resources/img/ic-outer.png" />
			</button>
			<button onclick="filterProducts('shoesList')">
				<img src="/resources/img/ic-shoes.png" />
			</button>
			<button onclick="filterProducts('accessoryList')">
				<img src="/resources/img/ic-accessory.png" />
			</button>
			<button onclick="filterProducts('hatList')">
				<img src="/resources/img/ic-hat.png" />
			</button>
		</div>
		<div id="product-section">
			<div id="bagList"></div>
			<div id="dressList"></div>
			<div id="bottomList"></div>
			<div id="topList"></div>
			<div id="outerList"></div>
			<div id="shoesList"></div>
			<div id="hatList"></div>
			<div id="accessoryList"></div>
		</div>
	</div>

</body>
<script src="/resources/js/UserUpdate.js"></script>
<script src="/resources/js/closet.js"></script>
<script src="/resources/js/tab.js"></script>

</html>
