<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@ include file="/WEB-INF/views/backoffice/bocommon.jsp" %>
<link rel="stylesheet" type="text/css" href="/resources/css/backoffice/banner.css" />
<title>대시보드</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/backoffice/layout.jsp" %>
	<div class="backoffice-content-wrapper">
		<div class="backoffice-qr-container">
			<p class="dashboard-title margin-title">배너 관리</p>
			<p class="backoffice-description">
				웹 상단에 노출되는 배너를 관리합니다
			</p>
			<p class="backoffice-description">
				배너 추가, 삭제 및 순서 변경이 가능합니다
			</p>
			<div class="banner-content-wrapper">
				<p style="font-size: 18px; font-weight: 550; margin: 12px 32px 0 32px;">배너 추가</p>
				<div class="new-banner-wrapper">
					<input type="text" id="banner-name" placeholder="배너 이름을 입력하세요">
					<div class="img-input-wrapper">
						<label for="banner-img">
							<div class="btn-upload">배너 업로드</div>
						</label>
						<input type="file" name="banner-img" id="banner-img" onchange="readURL(this);"> 
						<img id="preview" />
					</div>
					<div class="banner-btn-wrapper">
						<button onclick="addBanner()">추가</button>
					</div>
				</div>
				<p style="font-size: 18px; font-weight: 550; margin: 20px 32px 12px 32px;">기존 배너 관리</p>
				<div class="table-title">
					<div class="simple-wrapper">
						<p style="white-space: nowrap;">노출 순서</p>	
						<p class="banner-name">배너 이름</p>
					</div>
					<p class="title-img">배너 이미지</p>
					<div class="banner-btn-wrapper">
					</div>
				</div>
				<ul class="banner-list">
					<c:forEach var="banner" items="${bannerList }">
						<li>
							<div class="simple-wrapper">
								<p class="banner-order">${banner.displayOrder }</p>
								<p class="banner-name">${banner.bannerName }</p>
							</div>
							<img src="${banner.bannerUrl }">
							<div class="banner-btn-wrapper">
								<button onclick="deleteBanner(${banner.displayOrder})">삭제</button> 
								<button onclick="upBanner(${banner.displayOrder})">위로</button>
								<button onclick="downBanner(${banner.displayOrder})">아래로</button>
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/backoffice/banner.js"></script>
</html>