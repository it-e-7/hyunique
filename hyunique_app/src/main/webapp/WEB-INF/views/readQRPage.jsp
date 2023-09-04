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
			<div id="outputMessage">
			</div>
    		<div id="outputLayer" hidden>
    			<span id="outputData"></span>
    		</div>
		</div>
	</div>
	<div>&nbsp;</div>
	<div>
		<div id="frame">
			<div id="loadingMessage">
			</div>
			<canvas id="canvas"></canvas>
		</div>
	</div>
</body>
</html>