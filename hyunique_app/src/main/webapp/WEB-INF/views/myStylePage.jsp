<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<style>
.thumbnail-image {
	width: 200px;
	height: 200px;
}
</style>
</head>
<body>
	<br>
	<img src="${user.userBackimg}" width="800" height="400">
	<img src="${user.userImg}" width="200" height="200">
	<br> ${user.userNickname}
	<br> ${user.followerCount}
	<br> ${user.styleNames}
	<br> ${user.userIntroduce}
	<br> ${user.facebookUrl}
	<br> ${user.twitterUrl}
	<br> ${user.instagramUrl}
	<a href="update">회원정보 수정</a>
	<div id="thumbnails"></div>
	<div id="postUrl"></div>
	<div id="tabs">
	    <button onclick="handleTabClick('all')">전체보기</button>
	    <button onclick="handleTabClick('상의')">상의보기</button>
	    <button onclick="handleTabClick('하의')">하의보기</button>
	  </div>
	  <div id="closet"></div>	<a>세션아이디 : ${sessionId}</a>
	<button onclick="userPostList(${sessionId})">내 포스트</button>
	<button onclick="userPostList(24)">다른유저 포스트</button>
	<button onclick="fetchClosetInfo(${sessionId})">내 옷장 정보 보기</button>
</body>
<script src="/resources/js/UserUpdate.js"></script>
<script src="/resources/js/closet.js"></script>
</html>
