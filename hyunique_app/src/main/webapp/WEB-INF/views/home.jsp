<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
<%@ include file="/WEB-INF/views/common.jsp"%>
</head>
<body>
<h1>
	Hello world!  
</h1>

<P>  The time on the server is ${serverTime}. </P>
	<input type="file" accept="image/*" capture="camera" class="qr-btn" />
	<input type="file" accept="image/*" capture="capture" class="qr-btn" />
	<input type="file" accept="image/*" capture="environment" class="qr-btn" />
	<a href="camera://" class="qr-btn">카메라</a>
</body>
</html>
