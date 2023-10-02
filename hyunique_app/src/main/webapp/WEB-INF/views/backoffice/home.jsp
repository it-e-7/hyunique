<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/home.css" />
<title>대시보드</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="backoffice-qr-container">
			<p class="dashboard-title margin-title">환영합니다</p>
			<p class="backoffice-description">
				hyunique 서비스의 통계를 확인하고 지표를 관리해보세요
			</p>
			
			<div class="backoffice-home-container">
				<div class="dashboard-card-wrapper" onclick="location.href='/backoffice/qr'">
					<p class="card-title">QR 관리</p>
					<p class="card-description1">QR코드 스캔 횟수 관리</p>
					<p class="card-description2">판매 전략 수립, 오프라인 매장 위치 전략</p>
				</div>
				<div class="dashboard-card-wrapper" onclick="location.href='/backoffice/product'">
					<p class="card-title">HOT 상품</p>
					<p class="card-description1">게시글 태그 횟수, 게시물 인기 평가</p>
					<p class="card-description2">마케팅, 판매 전략 </p>
				</div>
				<div class="dashboard-card-wrapper" onclick="location.href='/backoffice/brand'">
					<p class="card-title">HOT 브랜드</p>
					<p class="card-description1">브랜드 매출, 브랜드 게시물 인기 평가</p>
					<p class="card-description2">브랜드 가치 평가, 팝업 스토어 전략 </p>
				</div>
				<div class="dashboard-card-wrapper" onclick="location.href='/backoffice/banner'">
					<p class="card-title">배너 관리</p>
					<p class="card-description1">웹 상단 노출 배너</p>
					<p class="card-description2">배너 추가, 삭제 및 순서 변경</p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>