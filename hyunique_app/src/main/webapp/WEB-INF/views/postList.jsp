<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post List</title>
</head>
<body>

<div id="main-wrapper">
<div id= "main-wrapper-top">
<div id= "hyunique-main-top-logo">
</div>
<div id= "hyunique-main-top-recommend">
</div>
<div id= "hyunique-main-top-filter">
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
<script>
    $(document).ready(function() {
        var itemsPerPage = 20;
        var currentPage = 0;
        var isLoading = false; //로딩중이다 아니다를 판단하기 위함

        $(window).scroll(function() {
            if (isScrollbarAtBottom()) {
                            if (isLoading) {
                                return;
                            }
                loadMoreImages();
            }
        });

        function loadMoreImages() {
        isLoading = true;
            $.ajax({
                url: "/hyunique/api/post/getMorePost",
                type: "GET",
                data: {
                    page: currentPage
                },
                success: function(data) {
                     $("#photo-gallery").append(data);
                    currentPage++;
                    isLoading = false;
                }
            });
        }

        function isScrollbarAtBottom() {
            var element = document.documentElement;
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (element.scrollTop || 0);
            var scrollHeight = (element.scrollHeight !== undefined) ? element.scrollHeight : 0;
            var windowHeight = element.clientHeight || window.innerHeight;

            return scrollTop + windowHeight >= scrollHeight; // 스크롤바가 가장 아래에 있는 경우 true를 반환
        }

        loadMoreImages();
    });
</script>



</div>
</div>

</body>
</html>