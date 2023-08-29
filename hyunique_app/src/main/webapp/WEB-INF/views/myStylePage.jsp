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
.product-card {
            width: 150px;
            height: 200px;
            border: 1px solid black;
            margin: 10px;
            display: inline-block;
        }
</style>
</head>
<body>
<a>세션아이디 : ${sessionId}</a>
<input type="hidden" id="session-id" value="${sessionId}">
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
	<button onclick="userPostList(24)">다른유저 포스트</button><br>
    <button onclick="filterProducts('bagList')">가방</button>
    <button onclick="filterProducts('dressList')">원피스</button>
    <button onclick="filterProducts('bottomList')">하의</button>
    <button onclick="filterProducts('topList')">상의</button>
    <button onclick="filterProducts('outerList')">겉옷</button>
    <button onclick="filterProducts('shoesList')">신발</button>
    <button onclick="filterProducts('accessoryList')">액세서리</button>

    <div id="bagList"></div>
    <div id="dressList"></div>
    <div id="outerList"></div>
    <div id="topList"></div>
    <div id="bottomList"></div>
    <div id="shoesList"></div>
    <div id="hatList"></div>
    <div id="accessoryList"></div>
    
    
</body>
<script src="/resources/js/UserUpdate.js"></script>
<script src="/resources/js/closet.js"></script>
</html>
