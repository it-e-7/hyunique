<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>QR</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<link rel="stylesheet" type="text/css" href="/resources/css/QRScanner.css" />
<script src="/resources/js/jsQR.js"></script>
<script src="/resources/js/qrCamera.js"></script>
</head>
<body>
	<div id="test">
		<div id="output">
            <button onclick="backward()">
            			<img src="/resources/img/ic-backward.png" />
            		</button>
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
			<div id="QRTagimg">
			    <img src="/resources/img/QRTag.png" />
			</div>
			<canvas id="canvas"></canvas>
			<div id="QRScanText">
                옷 가격표에 있는 <br>
                QR코드를 스캔해 주세요
			</div>
		</div>
	</div>
</body>
</html>