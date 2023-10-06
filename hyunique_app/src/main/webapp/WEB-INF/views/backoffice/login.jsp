<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<title>대시보드 로그인</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"></script>
<script src="/resources/js/backoffice/login.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/login.css" />
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="login-container">
			<p class="dashboard-title">로그인</p>
			<div class="login-form">
				<div>
					<p>ADMIN ID</p>
					<input type="text" id="input-admin-id">
				</div>
				<div>
					<p>ADMIN PW</p>
					<input type="password" id="input-admin-pw">
				</div>
				<button class="login-btn" onclick="signinAdmin()">로그인</button>
			</div>
		</div>
	</div>
</body>
</html>