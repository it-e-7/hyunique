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
    <button id="filterModalButton">모달 띄우기</button>

    <div class="modal">
        <div class="modal_body">
                <div>
                    <label for="maleRadio">MEN</label>
                    <input type="radio" id="maleRadio" name="gender" value="MEN">
                    <label for="femaleRadio">WOMEN</label>
                    <input type="radio" id="femaleRadio" name="gender" value="WOMEN">
                </div>

                <div>
                    <label for="heightRange">키: <span id="selectedHeight">150</span> cm</label>
                    <input type="range" id="heightRange" name="height" min="0" max="200" value="150">
                </div>

                <div>
                    <label>TPO</label>
                    <label for="beachCheckbox">바다</label>
                    <input type="checkbox" id="beachCheckbox" name="tpo" value="beach">
                    <label for="travelCheckbox">여행</label>
                    <input type="checkbox" id="travelCheckbox" name="tpo" value="travel">
                </div>

                <div>
                    <input type="submit" id="applyFilter" value="적용">
                </div>
            <button id="closeModalButton">모달 닫기</button>
        </div>
    </div>

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