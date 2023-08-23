<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post List</title>
    <link rel="stylesheet" type="text/css" href="/hyunique/resources/css/postList.css" />
    <link rel="stylesheet" type="text/css" href="/hyunique/resources/css/filterModal.css" />
</head>
<body>

<div id="main-wrapper">
<div id= "main-wrapper-top">
<div id= "hyunique-main-top-logo">
</div>
<div id= "hyunique-main-top-recommend">
</div>
<div id= "hyunique-main-top-filter">
    <script src="/hyunique/resources/js/filterModal.js"></script>
</div>

</div>
<div id= "main-wrapper-bottom">
<div id="infinite-scroll">
    <div id="photo-gallery">
        <c:forEach items="${postVOList}" var="post" varStatus="loop">
            <div class="photo">
                <img src="${post.thumbnailUrl}" alt="사진 ${loop.index}">
            </div>
        </c:forEach>
    </div>
</div>
       <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
       <script src="/hyunique/resources/js/infiniteScroll.js"></script>

</div>
</div>

</body>
</html>