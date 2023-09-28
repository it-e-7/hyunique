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
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body style="background-color: rgb(252,252,254);">
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
	
	<div class="content-wrapper">
		<div class="logo-wrapper">
			<a href = "/">
				<img src="/resources/img/hyunique.png" class="img-logo"/>
			</a>
		</div>
		<div class="instruct-text-wrapper">
			<p class="txt-instruct">
				간편하게 가입하고<br>다양하게 찾아보세요!
			</p>
		</div>
		<div class="intro-gif">
			<img src="/resources/img/gif-intro.gif"/>
		</div>
		<div class="login-text-wrapper">
			<p class="txt-login">
				SNS계정으로 로그인/회원가입
			</p>
		</div>
		<div class="login-btn-wrapper" data-aos="fade-up" data-aos-anchor=".other-element">
			<div id="kakao-login-btn">
				<a href="https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${API_URL}KakaoLogin&response_type=code">
					<img src="/resources/icon/kakao_login_wide_btn.png"  class="img-login-btn"/>
				</a>
			</div>
		</div>
		<div class="login-btn-wrapper" data-aos="fade-up" data-aos-delay="300" data-aos-anchor=".other-element">
			<div id="naver-login-btn">
				<a href = "${url}">
					<img src="/resources/icon/naver_login_wide_btn.png" class="img-login-btn"/>
				</a>
			</div>
		</div>
	</div>
	<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
 	<script>
		AOS.init();
	</script>		
</body>
</html>