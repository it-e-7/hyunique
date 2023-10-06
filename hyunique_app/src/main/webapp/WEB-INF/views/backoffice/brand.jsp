<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/brand.css" />
<title>인기 브랜드 관리</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="backoffice-qr-container">
			<p class="dashboard-title margin-title">HOT 브랜드</p>
			<p class="backoffice-description">
				브랜드 상품 판매 이력, 게시물에 태그된 횟수, 좋아요 갯수 등을 종합적으로 평가합니다
			</p>
			<p class="backoffice-description">
				팝업 스토어, 브랜드 가치 평가 등에 활용이 가능합니다  
			</p>
			<div class="dashboard-content-wrapper">
				<div class="canvas-wrapper">
					<canvas id="brand-chart"></canvas>
				</div>
				<div class="qr-dashboard-product-wrapper">
					<div class="qr-dashboard-button-wrapper">
						<button id="brand-tag" class="filter-btn filter-btn-selected" onclick="drawTagData()">게시 반응</button>
						<button id="brand-price" class="filter-btn" onclick="drawPriceData()">매출</button>
					</div>
					<div class="qr-dashboard-button-wrapper">
						<button id="1d-btn" class="filter-btn" onclick="getBrandData(1)">1일</button>
						<button id="7d-btn" class="filter-btn" onclick="getBrandData(7)">1주</button>
						<button id="30d-btn" class="filter-btn" onclick="getBrandData(30)">1달</button>
						<button id="90d-btn" class="filter-btn" onclick="getBrandData(90)">3달</button>
					</div>
					<p class="qr-product-title">브랜드 순위</p>
					<ul></ul>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/backoffice/brand.js"></script>
</html>