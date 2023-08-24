<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<br><img src="${user.userBackimg}">
	<img src="${user.userImg}">
	<br> ${user.userNickname}
	<br> ${user.followerCount}
	<br> ${user.styleNames}
	<br> ${user.userIntroduce}
</body>
</html>