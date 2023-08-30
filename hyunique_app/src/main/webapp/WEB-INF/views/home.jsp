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
	<button onclick="moveToCamera()" class="qr-btn" />
</body>
</html>
