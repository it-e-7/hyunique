<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

	<div class="dashboard-wrapper">
		<div class="dashboard-header-wrapper">
			<a href="">
				<img src="/resources/icon/hyuniquelogo.png"/>
			</a>
			<div style="display: flex; gap: 8px; align-items: center;">
				<button class="logout-btn" onclick="signoutAdmin()">로그아웃</button>
				<p> ADMIN님 환영합니다
			</div>
		</div>
		<div class="dashboard-navbar-wrapper">
			<ul class="dashboard-navbar">
				<li onclick="location.href = '/backoffice'" id="backoffice">홈</li>
				<li onclick="location.href = '/backoffice/qr'" id="qr">QR 관리</li>
				<li onclick="location.href = '/backoffice/product'" id="product">HOT 상품</li>
				<li onclick="location.href = '/backoffice/brand'" id="brand">HOT 브랜드</li>
				<li onclick="location.href = '/backoffice/banner'" id="banner">배너 관리</li>
			</ul>
		</div>
	</div>
	<script src="/resources/js/backoffice/common.js"></script>