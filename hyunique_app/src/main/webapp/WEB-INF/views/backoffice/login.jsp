<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<title>대시보드</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"></script>
<script src="/resources/js/backoffice/login.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<p>로그인</p>
		<input type="text" id="input-admin-id">
		<input type="password" id="input-admin-pw">
		<button class="login-btn" onclick="signinAdmin()">로그인</button>
	</div>
</body>
</html>