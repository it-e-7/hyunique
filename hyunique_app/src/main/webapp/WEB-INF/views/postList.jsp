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
                    <input type="radio" id="maleRadio" name="gender" value="M">
                    <label for="femaleRadio">WOMEN</label>
                    <input type="radio" id="femaleRadio" name="gender" value="W">
                </div>
                <div class="rs-height">
                140cm - 180cm
                </div>
                <div class="rs-container sliding">
                    <div class="rs-bg"></div>
                    <div class="rs-selected"></div>
                    <div class="rs-scale">
                        <!-- 슬라이더 눈금 표시 -->
                    </div>
                    <div class="rs-pointer" data-dir="left">
                    </div>
                    <div class="rs-slider-region"></div>
                    <div class="rs-pointer" data-dir="right">
                    </div>
                </div>


                <div>
                    <label>TPO</label>
                    <label for="beachCheckbox">코사 🏄</label>
                    <input type="checkbox" id="kosaCheckbox" name="tpo" value="21">
                    <label for="travelCheckbox">여행 🏖</label>
                    <input type="checkbox" id="travelCheckbox" name="tpo" value="22">
                    <label for="beachCheckbox">캠퍼스 🎓</label>
                    <input type="checkbox" id="campusCheckbox" name="tpo" value="23">
                    <label for="travelCheckbox">카페 ☕</label>
                    <input type="checkbox" id="cafeCheckbox" name="tpo" value="24">
                    <label for="beachCheckbox">데이트 💄</label>
                    <input type="checkbox" id="dateCheckbox" name="tpo" value="25">
                    <label for="travelCheckbox">결혼식 👰</label>
                    <input type="checkbox" id="merryCheckbox" name="tpo" value="26">
                    <label for="beachCheckbox">출근 🧔</label>
                    <input type="checkbox" id="officeCheckbox" name="tpo" value="27">
                    <label for="travelCheckbox">데일리 🍴</label>
                    <input type="checkbox" id="dailyCheckbox" name="tpo" value="28">
                </div>

                <div>
                    <label>SEASON</label>
                    <label for="beachCheckbox">봄 🌱</label>
                    <input type="checkbox" id="springCheckbox" name="season" value="21">
                    <label for="travelCheckbox">여름 ☀</label>
                    <input type="checkbox" id="summerCheckbox" name="season" value="22">
                    <label for="beachCheckbox">가을 🍂</label>
                    <input type="checkbox" id="fallCheckbox" name="season" value="23">
                    <label for="travelCheckbox">겨울 ☃</label>
                    <input type="checkbox" id="winterCheckbox" name="season" value="24">
                </div>

                <div>
                    <label>MOOD</label>
                    <label for="minimalCheckbox">미니멀</label>
                    <input type="checkbox" id="minimalCheckbox" name="mood" value="21">
                    <label for="easyCheckbox">이지캐주얼</label>
                    <input type="checkbox" id="easyCheckbox" name="mood" value="22">
                    <label for="businessCheckbox">비즈니스캐주얼</label>
                    <input type="checkbox" id="businessCheckbox" name="mood" value="23">
                    <label for="amekajiCheckbox">아메카지</label>
                    <input type="checkbox" id="amekajiCheckbox" name="mood" value="24">
                    <label for="streetCheckbox">스트릿</label>
                    <input type="checkbox" id="streetCheckbox" name="mood" value="25">
                    <label for="cityboyCheckbox">시티보이</label>
                    <input type="checkbox" id="cityboyCheckbox" name="mood" value="26">
                    <label for="onemileCheckbox">원마일웨어</label>
                    <input type="checkbox" id="onemileCheckbox" name="mood" value="27">
                    <label for="sportyCheckbox">스포티</label>
                    <input type="checkbox" id="sportyCheckbox" name="mood" value="28">
                    <label for="uniqueCheckbox">유니크</label>
                    <input type="checkbox" id="uniqueCheckbox" name="mood" value="29">
                    <label for="retroCheckbox">레트로</label>
                    <input type="checkbox" id="retroCheckbox" name="mood" value="30">
                    <label for="lovelyCheckbox">러블리</label>
                    <input type="checkbox" id="lovelyCheckbox" name="mood" value="31">
                    <label for="moderncasualCheckbox">모던캐주얼</label>
                    <input type="checkbox" id="moderncasualCheckbox" name="mood" value="32">
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