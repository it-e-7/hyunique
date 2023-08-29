<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	<%@ include file="/WEB-INF/views/common.jsp"%>
	<script src="/resources/js/UserUpdate.js"></script>
</head>
<body>

	<div class="inner-content">
		<div class="form-label">
			<p class="bold">프로필 설정</p>
			<p>*필수입력사항</p>
		</div>
		<hr>
		<div class="form-label">
			<img src="${user.userBackimg}"><br> <img
				src="${user.userImg}">
		</div>

		<div class="form-label">
			<label for="userNickname">닉네임 *</label>
		</div>
		<div class="form-content">
			<input id="userNickname" type="text" name="userNickname"
				value="${user.userNickname}">
		</div>

		<div class="form-label">
			<label for="userIntroduce">한 줄 자기소개</label>
		</div>
		<div class="form-content">
			<input id="userIntroduce" type="text" name="userIntroduce"
				value="${user.userIntroduce}">
		</div>

		<div class="form-label">
			<label for="userSex">성별</label>
		</div>
		<div class="form-content">
			<select id="userSex" name="userSex">
				<option value="남성">남성</option>
				<option value="여성">여성</option>
				<option value="기타">기타</option>
				<option value="알리지 않음">알리지 않음</option>
			</select>
		</div>



		<div class="form-label">
			<label for="userHeight">신장</label>
		</div>
		<div class="form-content">
			<input id="userHeight" type="number" name=userHeight
				value="${user.userHeight}">
		</div>
		<div class="form-label">
			<label for="instagramUrl">인스타그램</label>
		</div>
		<div class="form-content">
			<input id="instagramUrl" type="text" name=instagramUrl
				value="${user.instagramUrl}">
		</div>

		<div class="form-label">
			<label for="twitterUrl">트위터</label>
		</div>
		<div class="form-content">
			<input id="twitterUrl" type="text" name=twitterUrl
				value="${user.twitterUrl}">
		</div>

		<div class="form-label">
			<label for="facebookUrl">페이스북</label>
		</div>
		<div class="form-content">
			<input id="facebookUrl" type="text" name=facebookUrl
				value="${user.facebookUrl}">
		</div>


		<div class="form-content">
			<div class="form-buttons">
				<button class="btn-submit" onclick="updateUser()">수정 완료하기</button>
			</div>
		</div>

	</div>
</body>
</html>