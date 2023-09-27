<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/qr.css" />
<title>대시보드</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="backoffice-qr-container">
			<p class="dashboard-title margin-title">QR 관리</p>
			<p class="backoffice-description">
				QR코드를 스캔한 횟수를 나타냅니다
			</p>
			<p class="backoffice-description">
				오프라인 매장의 위치와 상품의 인기도 등을 판단해 판매 전략에 이용할 수 있습니다   
			</p>
			<div class="dashboard-content-wrapper">
				<div class="canvas-wrapper">
					<canvas id="qr-chart"></canvas>
				</div>
				<div class="qr-dashboard-product-wrapper">
					<div class="qr-dashboard-button-wrapper">
						<button id="1d-btn" class="filter-btn" onclick="getQRData(1)">1일</button>
						<button id="7d-btn" class="filter-btn" onclick="getQRData(7)">1주</button>
						<button id="30d-btn" class="filter-btn" onclick="getQRData(30)">1달</button>
						<button id="90d-btn" class="filter-btn" onclick="getQRData(90)">3달</button>
					</div>
					<p class="qr-product-title">QR 태그 순위</p>
					<ul></ul>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/backoffice/qr.js"></script>
</html>