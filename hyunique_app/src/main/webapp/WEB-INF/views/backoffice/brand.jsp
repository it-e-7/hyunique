<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/brand.css" />
<title>대시보드</title>
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
			<div class="backoffice-brand-container">
				
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/backoffice/brand.js"></script>
</html>