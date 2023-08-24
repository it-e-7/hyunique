<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<script src="/hyunique/resources/js/UserUpdate.js"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"
	integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
	crossorigin="anonymous"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<div class="inner-content">
		<div class="form-label">
			<p class="bold">프로필 설정</p>
			<p>*필수입력사항</p>
		</div>
		<hr>
		<div class="form-label">
			<img src="${user.userBackimg}"><br>
			<img src="${user.userImg}">
		</div>

		<div class="form-label">
			<label for="userNickname">닉네임 *</label>
		</div>
		<div class="form-content">
			<input id="userNickname" type="text" name="userNickname"
				placeholder="${user.userNickname}">
		</div>

		<div class="form-label">
			<label for="userIntroduce">한 줄 자기소개</label>
		</div>
		<div class="form-content">
			<input id="userIntroduce" type="text" name="userIntroduce"
				placeholder="${user.userIntroduce}">
		</div>

		<div class="form-label">
			<label for="gender">성별</label>
		</div>
		<div class="form-content">
			<select id="gender" name="gender">
				<option value="남자">남자</option>
				<option value="여자">여자</option>
				<option value="기타">기타</option>
				<option value="무응답">알리지 않음</option>
			</select>
		</div>


		<div class="form-label">
			<label for="instagramUrl">인스타그램</label>
		</div>
		<div class="form-content">
			<input id="instagramUrl" type="text" name=instagramUrl
				placeholder="${user.instagramUrl}">
		</div>

		<div class="form-label">
			<label for="twitterUrl">트위터</label>
		</div>
		<div class="form-content">
			<input id="twitterUrl" type="text" name=twitterUrl placeholder="${user.twitterUrl}">
		</div>

		<div class="form-label">
			<label for="facebookUrl">페이스북</label>
		</div>
		<div class="form-content">
			<input id="facebookUrl" type="text" name=facebookUrl
				placeholder="${user.facebookUrl}">
		</div>


		<div class="form-content">
			<div class="form-buttons">
				<button class="btn-submit" onclick="updateUser()">수정 완료하기</button>
			</div>
		</div>

	</div>
</body>
</html>