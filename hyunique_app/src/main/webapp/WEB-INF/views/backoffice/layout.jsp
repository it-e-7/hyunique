<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>대시보드</title>
<%@ include file="/WEB-INF/views/common.jsp" %>
<link rel="stylesheet" type="text/css"
	href="/resources/css/backoffice/template.css" />
	
</head>
<body>
	<div class="dashboard-wrapper">
		<div class="dashboard-header-wrapper">
			<a href="">
				<img src="/resources/icon/hyuniquelogo.png"/>
			</a>
			<p> 로그아웃
			<p> admin님 환영합니다
		</div>
		<div class="dashboard-navbar-wrapper">
			<ul class="dashboard-navbar">
				<li>
					<a href="">홈</a>
					<a href="">QR 관리</a>
					<a href="">HOT 상품</a>
					<a href="">HOT 브랜드</a>
					<a href="">배너 관리</a>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>