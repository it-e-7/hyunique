<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>QR코드 스캔 | 현대를 입다 HYUNIQUE</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css" href="/resources/css/QRScanner.css" />
<script src="/resources/js/jsQR.js"></script>
<script src="/resources/js/qrCamera.js"></script>
</head>
<body>
	<div id="test">
		<div id="output">
           <button onclick="backward()">
				<lord-icon
					id="backward-btn"
				    src="https://cdn.lordicon.com/zmkotitn.json"
				    trigger="click"
				    colors="primary:#121331"
				    style="transform: rotateY(180deg);
				">
				</lord-icon>
			</button>
			<p>QR 스캔</p>
			<div id="outputMessage">
			</div>
    		<div id="outputLayer" hidden>
    			<span id="outputData"></span>
    		</div>
		</div>
	</div>
	<div>
		<div id="frame">
			<div id="loadingMessage">
			</div>
			<div class="camera-wrapper">
				<canvas id="canvas"></canvas>
				<div class="qr-modal-section">
					<div class="qr-modal">
						<div class="qr-border-modal-wrapper">
							<div class="border-modal left-top-border"></div>
							<div class="border-modal right-top-border"></div>
							<div class="border-modal left-bottom-border"></div>
							<div class="border-modal right-bottom-border"></div>
						</div>
					</div>
				</div>
			</div>
			<div id="QRScanText">
                <strong>스타일피플의 착장 보러가기</strong>
                <p>옷에 있는 QR코드를 스캔하세요</p>
			</div>
		</div>
	</div>
</body>
</html>