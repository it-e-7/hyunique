<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>QR</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
<script src="/resources/js/jsQR.js"></script>
<script src="/resources/js/qrCamera.js"></script>
</head>
<body>
	<div id="test">
		<div id="output">
			<div id="outputMessage">
				QR코드를 카메라에 노출시켜 주세요
			</div>
    		<div id="outputLayer" hidden>
    			<span id="outputData"></span>
    		</div>
		</div>
	</div>
	<div>&nbsp;</div>
	<div>
		<h1>스캔</h1>
		<div id="frame">
			<div id="loadingMessage">
				🎥 비디오 스트림에 액세스 할 수 없습니다<br/>카메라가 활성화되어 있는지 확인하십시오
			</div>
			<canvas id="canvas"></canvas>
		</div>
	</div>
</body>
</html>