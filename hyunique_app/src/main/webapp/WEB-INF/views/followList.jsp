<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0">
<title>팔로워/팔로잉</title>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"
	integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
	crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/main.css" />
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/resources/css/userStyle.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/follow.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css" integrity="sha512-3pIirOrwegjM6erE5gPSwkUzO+3cTjpnV9lexlNZqvupR64iZBnOOTiiLPb9M36zpMScbmUNIcHUqKD47M719g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
<div id="session-info">
	<input type="hidden" id="userId" value="${userId}">
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
		<div class="txt-user-profile">
			<p>${userNickname}</p>
		</div>
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
</div>
<ul class="tab-bar">
    <li data-num="0" class="tab wave dark tab-button" data-tab-target="#tab1" id="tab-1">팔로워</li>
    <li data-num="1" class="tab wave dark tab-button" data-tab-target="#tab2" id="tab-2">팔로잉</li>
    <div class="indicator"></div>
</ul>

<div id="tab1" class="tab-content"style="display: block;">
	<p class="follow-title-sub">모든 팔로워</p>
    <ul id="followerList"></ul>
</div>

<div id="tab2" class="tab-content"style="display: none;">
	<p class="follow-title-sub">모든 팔로잉</p>
    <ul id="followingList"></ul>
</div>

<script src="/resources/js/tab.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/follow.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
	AOS.init();
</script>	
</body>
</html>