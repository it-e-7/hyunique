<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<%@ include file="/WEB-INF/views/common.jsp"%>
</head>
<body>
	<!-- 카카오 로그인 -->
	<a class="p-2" href="https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=http://localhost:8080/hyunique/KakaoLogin&response_type=code">
		<img src="https://developers.kakao.com/docs/static/image/ko/m/kakaologin.png" style="height:200px">
	</a>
	
	<!-- 네이버 로그인 창으로 이동 -->
	<div id="naver_id_login" style="text-align:center"><a href="${url}">
	<img width="223" src="https://developers.naver.com/doc/review_201802/CK_bEFnWMeEBjXpQ5o8N_20180202_7aot50.png"/></a></div>
	<br>
</body>
</html>