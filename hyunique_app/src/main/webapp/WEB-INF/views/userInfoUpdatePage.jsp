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
<link rel="stylesheet" type="text/css"
	href="/resources/css/userupdatestyle.css" />
	
</head>
<body>
	<div id="session-info">
		<input type="hidden" id="session-id" value="${sessionId}">
	</div>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/resources/img/ic-backward.png" />
		</button>
	</div>
	<div class="content-wrapper">
		<form id="userUpdateForm">
			<div class="form-label">
				<p class="txt-profile-title">프로필 설정</p>
			</div>
			<div class="form-label" id="user-img-section-wrapper">
			    <!-- 프로필 사진 영역 -->
			    <div class="user-img-wrapper" id="user-profile-img-change-section">
			        <img src="${user.userImg}" id="profile-preview">
			        <input type="file" id="profile-file-input" accept="image/*" style="display:none;">
			        <p class="txt-user-img-change">
			            프로필 사진 바꾸기
			        </p>
			    </div>
			    <!-- 배경 사진 영역 -->
			    <div class="user-img-wrapper" id="user-back-img-change-section">
			        <img src="${user.userBackimg}" id="back-preview">
			        <input type="file" id="back-file-input" accept="image/*" style="display:none;">
			        <p class="txt-user-img-change">
			            배경 사진 바꾸기
			        </p>
			    </div>
			</div>

			<div class="form-wrapper">
				<div class="form-label">
					<label for="userNickname">닉네임 *</label>
				</div>
				<div class="form-content">
					<input id="userNickname" type="text" name="userNickname"
						value="${user.userNickname}" placeholder="다른 사람에게 보여질 이름이에요" required>
				</div>
		
				<div class="form-label">
					<label for="userIntroduce">한 줄 자기소개</label>
				</div>
				<div class="form-content">
					<input id="userIntroduce" type="text" name="userIntroduce"
						value="${user.userIntroduce}" placeholder="${user.userNickname}님을 소개해보세요">
				</div>
				<div class="form-label">
					<label for="userHeight">신장</label>
				</div>
				<div class="form-content">
					<input id="userHeight" type="number" name=userHeight
						value="${user.userHeight}" placeholder="${user.userNickname}님의 키를 입력해주세요">
				</div>
				<div class="form-label">
					<label for="userForm">체형</label>
				</div>
				<div class="form-content">
					<input id="userForm" type="text" name=userForm
						value="${user.userForm}" placeholder="${user.userNickname}님의 체형을 입력해주세요">
				</div>
				<div class="form-label">
					<label for="userSex">성별</label>
				</div>
				<div class="form-content">
				    <div id="userSex">
				        <input type="radio" name="userSex" value="M" id="male"><label for="male">남성</label>
				        <input type="radio" name="userSex" value="W" id="female"><label for="female">여성</label>
				        <input type="radio" name="userSex" value="O" id="other"><label for="other">기타</label>
				        <input type="radio" name="userSex" value="N" id="preferNotToSay"><label for="preferNotToSay">알리지 않음</label>
				    </div>
				</div>
				<div class="form-label">
					<label for="userPrefer">선호 스타일</label>
				</div>
				<div class="form-content">
				    <div id="userPrefer">
				        <input type="checkbox" name="userPrefer" value="미니멀" id="21"><label for="21">미니멀</label>
				        <input type="checkbox" name="userPrefer" value="이지캐주얼" id="22"><label for="22">이지캐주얼</label>
				        <input type="checkbox" name="userPrefer" value="비즈니스캐주얼" id="23"><label for="23">비즈니스캐주얼</label>
				        <input type="checkbox" name="userPrefer" value="아메카지" id="24"><label for="24">아메카지</label>
				        <input type="checkbox" name="userPrefer" value="스트릿" id="25"><label for="25">스트릿</label>
				        <input type="checkbox" name="userPrefer" value="시티보이" id="26"><label for="26">시티보이</label>
				        <input type="checkbox" name="userPrefer" value="원마일웨어" id="27"><label for="27">원마일웨어</label>
				        <input type="checkbox" name="userPrefer" value="스포티" id="28"><label for="28">스포티</label>
				        <input type="checkbox" name="userPrefer" value="유니크" id="29"><label for="29">유니크</label>
				        <input type="checkbox" name="userPrefer" value="레트로" id="30"><label for="30">레트로</label>
				        <input type="checkbox" name="userPrefer" value="러블리" id="31"><label for="31">러블리</label>
				        <input type="checkbox" name="userPrefer" value="모던캐주얼" id="32"><label for="32">모던캐주얼</label>
				    </div>
				</div>
				<div class="form-label">
					<label for="instagramUrl">인스타그램</label>
				</div>
				<div class="form-content">
					<input id="instagramUrl" type="text" name=instagramUrl
						value="${user.instagramUrl}" placeholder="아이디 혹은 주소를 입력해주세요">
				</div>
		
				<div class="form-label">
					<label for="twitterUrl">트위터</label>
				</div>
				<div class="form-content">
					<input id="twitterUrl" type="text" name=twitterUrl
						value="${user.twitterUrl}" placeholder="아이디 혹은 주소를 입력해주세요">
				</div>
		
				<div class="form-label">
					<label for="facebookUrl">페이스북</label>
				</div>
				<div class="form-content">
					<input id="facebookUrl" type="text" name=facebookUrl
						value="${user.facebookUrl}" placeholder="아이디 혹은 주소를 입력해주세요">
				</div>
				<div class="form-content">
					<div class="form-buttons">
	        			<button class="btn-submit jw-btn" type="submit">수정 완료하기</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</body>
</html>