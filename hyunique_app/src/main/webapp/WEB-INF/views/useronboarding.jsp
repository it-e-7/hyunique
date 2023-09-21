<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<script src="/resources/js/UserUpdate.js"></script>
<script src="/resources/js/onboarding.js"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/css/onboarding.css" />
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
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
	</div>
	<div id="userUpdateForm">
		<div class="form-wrapper">
			<div class="content-wrapper" id="form-nickname">
				<div class="form-label">
					<label for="userNickname">닉네임을</label>
					<label for="userNickname">입력해주세요</label>
					<label for="userNickname" id="small-text-label">다른 유저에게 보이는 별명이에요</label>
				</div>
				<div class="form-content">
					<input id="userNickname" type="text" name="userNickname"
						value="${user.userNickname}" placeholder="다른 사람에게 보여질 이름이에요" required>
				</div>
	   			<button class="btn-next jw-btn-radius" id="finish-nickname">성별 입력하러 가기</button>
				<div class="skip-buttons">나중에 입력할게요</div>
			</div>
			
			<div class="content-wrapper" id="form-usersex">
				<div class="form-label">
					<label for="userSex">성별을</label>
					<label for="userSex">입력해주세요</label>
					<label for="userSex" id="small-text-label">스타일링 검색과 공유에 사용돼요</label>
				</div>
				<div class="form-content">
				    <div id="userSex">
				        <input type="radio" name="userSex" value="M" id="male"><label for="male">남성</label>
				        <input type="radio" name="userSex" value="W" id="female"><label for="female">여성</label>
				        <input type="radio" name="userSex" value="O" id="other"><label for="other">기타</label>
				        <input type="radio" name="userSex" value="N" id="preferNotToSay"><label for="preferNotToSay">알리지 않음</label>
				    </div>
				</div>
	     		<button class="btn-next jw-btn-radius" id="finish-usersex">키 입력하러 가기</button>
				<div class="skip-buttons">나중에 입력할게요</div>
			</div>
			
			<div class="content-wrapper" id="form-userheight">
				<div class="form-label">
					<label for="userHeight">키(신장)를</label>
					<label for="userHeight">입력해 주세요</label>
					<label for="userHeight" id="small-text-label">스타일링 검색과 공유에 사용돼요</label>
					
				</div>
				<div class="form-content">
					<input id="userHeight" type="number" name=userHeight
						value="${user.userHeight}" placeholder="키(신장)를 입력해주세요">
				</div>
	     		<button class="btn-next jw-btn-radius" id="finish-userheight">거의 다 끝났어요</button>
				<div class="skip-buttons">나중에 입력할게요</div>
			</div>
			
			<div class="content-wrapper" id="form-userprefer">
				<div class="form-label">
					<label for="userPrefer">선호하는 스타일을</label>
					<label for="userPrefer">입력해주세요</label>
					<label for="userPrefer" id="small-text-label">스타일링 공유 시 활용돼요</label>
					
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
	      		<button class="btn-submit jw-btn-radius" id="finish-userprefer" onclick="updateUser()">시작하기</button>
				<div class="skip-buttons" type="submit">나중에 입력할게요</div>
			</div>
			<div class="content-wrapper" id="form-finished">
				<div class="form-label">
					<label>환영합니다</label>
					<label id="small-text-label">이제 hyunique의 더욱 다양한 기능을 이용하실 수 있어요</label>
				</div>
			    <div class="image-container"> 
		            <img src="/resources/img/fashion-person.gif"/>
		        </div>
			</div>
		</div>
	</div>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
	AOS.init();
</script>
</body>
</html>