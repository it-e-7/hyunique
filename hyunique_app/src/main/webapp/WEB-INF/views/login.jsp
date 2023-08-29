<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>hyunique login</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css"
	href="/resources/css/login.css" />
</head>
<body>
	<div class="header-wrapper">
		<button onclick="backward()">
			<img src="/resources/img/ic-backward.png" />
		</button>
	</div>
	
	<div class="content-wrapper">
		<div class="logo-wrapper">
			<a href = "post/getPostList">
				<img src="/resources/icon/hyuniquelogo.png" class="img-logo"/>
			</a>
		</div>
		<div class="instruct-text-wrapper">
			<p class="txt-instruct">
				간편하게 가입하고<br>다양하게 찾아보세요!
			</p>
		</div>
		<div class="login-text-wrapper">
			<p class="txt-login">
				SNS계정으로 로그인/회원가입
			</p>
		</div>
		<div class="login-btn-wrapper">
			<div id="kakao-login-btn">
				<a href="https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=http://localhost:8080/KakaoLogin&response_type=code">
					<img src="/resources/icon/kakao_login_wide_btn.png"  class="img-login-btn"/>
				</a>
			</div>
		</div>
		<div class="login-btn-wrapper">
			<div id="naver-login-btn">
				<a href = "${url}">
					<img src="/resources/icon/naver_login_wide_btn.png" class="img-login-btn"/>
				</a>
			</div>
		</div>
	</div>
		
		
</body>
</html>