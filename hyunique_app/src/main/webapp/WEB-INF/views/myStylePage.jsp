<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Cache-Control" content="no-cache" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">
<title>마이페이지</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css" href="/resources/css/userStyle.css" />
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
	<div id="session-info">
		<input type="hidden" id="session-id" value="${sessionId}">
		<input type="hidden" id="user-id" value="${user.userId}">
		<input type="hidden" id="user-isFollowing" value="${user.isFollowing}">
	</div>
	<div class="header-wrapper">
		<lord-icon
			onclick="backward()"
	         id="backward-btn"
	         src="https://cdn.lordicon.com/zmkotitn.json"
	         trigger="click"
	         colors="primary:#121331"
	         style="transform: rotateY(180deg);"
	         onerror="showFallbackImage()">
	    </lord-icon>
   		<img id="fallback-img" src="/resources/img/ic-backward.png" style="display:none;">
		<div class="txt-user-profile">
			<p>${user.userNickname}</p>
		</div>
		<c:choose>
		    <c:when test="${isCurrentUser == true}">
		      <a href="#" id="updateLink">
				<lord-icon
				    id="settings"
				    src="https://cdn.lordicon.com/hwuyodym.json"
				    trigger="click"
				    colors="primary:#121331"
				    state="hover-1"
				    style="width:30px;height:30px">
				    </lord-icon>
				</a>
		    </c:when>
		    <c:otherwise>
		        <div style="visibility: hidden;">
 					<lord-icon
		           		id="settings"
					    src="https://cdn.lordicon.com/hwuyodym.json"
					    trigger="hover"
					    colors="primary:#121331"
					    state="hover-1"
					    style="width:30px;height:30px">
					</lord-icon>		        
				</div>
		    </c:otherwise>
		</c:choose>
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
			<div class="user-sns-btn-wrapper">
			    <c:choose>
			        <c:when test="${not empty user.facebookUrl}">
			            <a href="${user.facebookUrl}"><img src="/resources/icon/facebook_logo.png"/></a>
			        </c:when>
			        <c:otherwise>
			            <img src="/resources/icon/facebook_logo_null.png" />
			        </c:otherwise>
			    </c:choose>
			
			    <c:choose>
			        <c:when test="${not empty user.twitterUrl}">
			            <a href="${user.twitterUrl}"><img src="/resources/icon/twitter_logo.png" /></a>
			        </c:when>
			        <c:otherwise>
			            <img src="/resources/icon/twitter_logo_null.png" />
			        </c:otherwise>
			    </c:choose>
			
			    <c:choose>
			        <c:when test="${not empty user.instagramUrl}">
			            <a href="${user.instagramUrl}"><img src="/resources/icon/instagram_logo.png" /></a>
			        </c:when>
			        <c:otherwise>
			            <img src="/resources/icon/instagram_logo_null.png" />
			        </c:otherwise>
			    </c:choose>
			</div>
			<div class="user-detail-bar-wrapper" onclick= "moveToFollow(${user.userId})">
				<p id="user-detail-title">팔로워</p>
				<p id="vertical-bar">|</p>
				<p id="user-follower">${user.followerCount}명</p>
			</div>
			<div class="user-detail-bar-wrapper">
				<p id="user-detail-title">스타일</p>
				<p id="vertical-bar">|</p>
				<p id="user-follower">${user.userPrefer}</p>
			</div>
			<div class="user-detail-bar-wrapper">
				<p id="user-detail-title">체형</p>
				<p id="vertical-bar">|</p>
				<p id="user-follower">${user.userForm}</p>
			</div>
			<div class="introduce-follower-section">
				<div class="user-introduce-wrapper">${user.userIntroduce}</div>
				<c:choose>
				    <c:when test="${isCurrentUser == true}">
				       <div></div>
				    </c:when>
				    <c:otherwise>
						<c:if test="${sessionId != user.userId}">
							<div class="follower-btn-wrapper" data-aos="fade-right"  data-aos-delay="300">
						  		<input type="checkbox" name="btn-follower" value="follower-toggle" onclick="toggleFollow(${user.userId})" id="follower-toggle"><label for="follower-toggle" id="follower-label">팔로우 +</label>
							</div>
						</c:if>
				    </c:otherwise>
				</c:choose>
				
			</div>
		</div>
	</div>
	
	<div class="horizontal-bar"> </div>
	<ul class="tab-bar">
	    <li data-num="0" class="tab wave dark tab-button" data-tab-target="#tab1" id="tab-1">스타일링</li>
	    <li data-num="1" class="tab wave dark tab-button" data-tab-target="#tab2" id="tab-2" onclick="filterProducts('allList')">옷장</li>
	    <div class="indicator"></div>
	</ul>

	<div id="tab1" class="tab-content"style="display: block;">
		<div id="thumbnails" class="style-thumbnail-list-wrapper" ></div>
		<div id="postUrl"></div>
	</div>

	<div id="tab2" class="tab-content"style="display: none;">
		<div class="button-section">
			<button onclick="filterProducts('allList')">
				<img src="/resources/img/ic-allproducts.png" />
			</button>
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
			<div id="allList" class="product-list-wrapper"></div>
			<div id="bagList" class="product-list-wrapper"></div>
			<div id="dressList"class="product-list-wrapper"></div>
			<div id="bottomList"class="product-list-wrapper"></div>
			<div id="topList"class="product-list-wrapper"></div>
			<div id="outerList"class="product-list-wrapper"></div>
			<div id="shoesList"class="product-list-wrapper"></div>
			<div id="hatList"class="product-list-wrapper"></div>
			<div id="accessoryList"class="product-list-wrapper"></div>
		</div>
	</div>
	<c:choose>
	    <c:when test="${isCurrentUser == false}">
	       <div></div>
	    </c:when>
	    <c:otherwise>
			<c:if test="${sessionId == user.userId}">
				<button id="movePostPage" class="posting-btn" onclick="movePostPage()">
					<img src="/resources/img/posting-btn.png"/>
				</button>
			</c:if>
	    </c:otherwise>
	</c:choose>
	

</body>
<script src="/resources/js/closet.js"></script>
<script src="/resources/js/UserUpdate.js"></script>
<script src="/resources/js/tab.js"></script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
	AOS.init();
</script>	
</html>
