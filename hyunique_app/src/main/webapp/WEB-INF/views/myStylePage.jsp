<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<style>
.thumbnail-image {
	width: 200px;
	height: 200px;
}
</style>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"
	integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
	crossorigin="anonymous"></script>
<script src="/resources/js/UserUpdate.js"></script>
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
	<a>세션아이디 : ${sessionId}</a>
	<button onclick="userPostList(${sessionId})">내 포스트</button>
	<button onclick="userPostList(24)">다른유저 포스트</button>


</body>
</html>
