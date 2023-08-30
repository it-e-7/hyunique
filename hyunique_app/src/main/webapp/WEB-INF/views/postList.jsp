<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post List</title>
	<%@ include file="/WEB-INF/views/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="/resources/css/postList.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/filterModal.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/main.css" />
</head>
<body>

<div id="main-wrapper">
<div id= "main-wrapper-top">
    <div id="hyunique-main-top-logo">
             <button id="hyunique-main-top-logo-image" onclick="backward()">
                    <img src="/resources/img/hyunique.png" />
             </button>
             <div id="hyunique-main-top-buttons">
                  <button id="search-button">
                    <img src="/resources/img/ic-search.png" />
                  </button>
                  <button id="my-page-button">
                    <img src="/resources/img/ic-person.png" />
                  </button>
             </div>
    </div>
</div>
<div id= "hyunique-main-top-recommend">
      <div class="button" id="recommend">추천</div>
      <div class="button" id="style-ranking">스타일 랭킹</div>
      <div class="button" id="following">팔로잉</div>
</div>
<div id= "hyunique-main-top-filter">
    <button id="filterModalButton" class="filter-img-div">
        <img src="/resources/img/filter.png" />
    </button>
    <c:forEach var="tag" items="${['남', '여', '미니멀', '이지캐주얼', '비즈니스캐주얼', '스트릿', '원마일웨어', '유니크', '러블리', '아메카지','시티보이']}">
      <button id="filterModalButton${loop.index}" class="FilterModalButton${tag}" onclick="handleButtonClick('${tag}')">
        <div id=textLine>
        ${tag}
        </div>
      </button>
    </c:forEach>

    <div class="modal">
        <div class="modal_body">
            <div id="modal_top">
                <button id="closeModalButton">
                    <img src="/resources/img/ic-backward.png" >
                </button>
                <div id="modal_name">필터</div>
                <button id="resetModalButton">초기화</button>
            </div>
            <div id="modal_bottom">
            <div id="type">
              <div id ="genderDiv">
              <label>GENDER</label>
              </div>
              <div class="gender-options">
                  <div id=select-type-button>
                    <label for="maleCheckbox">MEN</label>
                     <input type="checkbox" id="maleCheckbox" name="gender" value="M">
                  </div id=select-type-button>
                  <div id=select-type-button>
                     <label for="femaleCheckbox">WOMEN</label>
                     <input type="checkbox" id="femaleCheckbox" name="gender" value="W">
                  </div>
              </div>
            </div>

            <div id="rs">
            <div class="rs-height" id="type">
            <div id ="heightDiv">
                <label>HEIGHT</label>
            </div>
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
            </div>

            <div id="type">
                <div id ="tpoDiv">
                     <label>TPO</label>
                </div>
                <div id="tpo-options">
                    <div id=select-type-button>
                    <label for="beachCheckbox">코사 🏄</label>
                    <input type="checkbox" id="kosaCheckbox" name="tpo" value="21">
                    </div>
                    <div id=select-type-button>
                    <label for="travelCheckbox">여행 🏖</label>
                    <input type="checkbox" id="travelCheckbox" name="tpo" value="22">
                    </div>
                    <div id=select-type-button>
                    <label for="beachCheckbox">캠퍼스 🎓</label>
                    <input type="checkbox" id="campusCheckbox" name="tpo" value="23">
                    </div>
                    <div id=select-type-button>
                    <label for="travelCheckbox">카페 ☕</label>
                    <input type="checkbox" id="cafeCheckbox" name="tpo" value="24">
                    </div>
                    <div id=select-type-button>
                    <label for="beachCheckbox">데이트 💄</label>
                    <input type="checkbox" id="dateCheckbox" name="tpo" value="25">
                    </div>
                    <div id=select-type-button>
                    <label for="travelCheckbox">결혼식 👰</label>
                    <input type="checkbox" id="merryCheckbox" name="tpo" value="26">
                    </div>
                    <div id=select-type-button>
                    <label for="beachCheckbox">출근 🧔</label>
                    <input type="checkbox" id="officeCheckbox" name="tpo" value="27">
                    </div>
                    <div id=select-type-button>
                    <label for="travelCheckbox">데일리 🍴</label>
                    <input type="checkbox" id="dailyCheckbox" name="tpo" value="28">
                    </div>
                </div>
            </div>

            <div id="type">
                <div id ="seasonDiv">
                      <label>SEASON</label>
                </div>
                    <div id="season-options">
                        <div id="select-type-button">
                        <label for="beachCheckbox">봄 🌱</label>
                        <input type="checkbox" id="springCheckbox" name="season" value="21">
                        </div>
                        <div id="select-type-button">
                        <label for="travelCheckbox">여름 ☀</label>
                        <input type="checkbox" id="summerCheckbox" name="season" value="22">
                        </div>
                        <div id="select-type-button">
                        <label for="beachCheckbox">가을 🍂</label>
                        <input type="checkbox" id="fallCheckbox" name="season" value="23">
                        </div>
                        <div id="select-type-button">
                        <label for="travelCheckbox">겨울 ☃</label>
                        <input type="checkbox" id="winterCheckbox" name="season" value="24">
                    </div>
                </div>
            </div>

            <div id="type">
                <div id ="seasonDiv">
                     <label>STYLE</label>
                </div>
                <div id="tpo-options">
                    <div id="select-type-button">
                    <label for="minimalCheckbox">미니멀</label>
                    <input type="checkbox" id="minimalCheckbox" name="style" value="21">
                    </div>
                    <div id="select-type-button">
                    <label for="easyCheckbox">이지캐주얼</label>
                    <input type="checkbox" id="easyCheckbox" name="style" value="22">
                    </div>
                    <div id="select-type-button">
                    <label for="businessCheckbox">비즈니스캐주얼</label>
                    <input type="checkbox" id="businessCheckbox" name="style" value="23">
                    </div>
                    <div id="select-type-button">
                    <label for="amekajiCheckbox">아메카지</label>
                    <input type="checkbox" id="amekajiCheckbox" name="style" value="24">
                    </div>
                    <div id="select-type-button">
                    <label for="streetCheckbox">스트릿</label>
                    <input type="checkbox" id="streetCheckbox" name="style" value="25">
                    </div>
                    <div id="select-type-button">
                    <label for="cityboyCheckbox">시티보이</label>
                    <input type="checkbox" id="cityboyCheckbox" name="style" value="26">
                    </div>
                    <div id="select-type-button">
                    <label for="onemileCheckbox">원마일웨어</label>
                    <input type="checkbox" id="onemileCheckbox" name="style" value="27">
                    </div>
                    <div id="select-type-button">
                    <label for="sportyCheckbox">스포티</label>
                    <input type="checkbox" id="sportyCheckbox" name="style" value="28">
                    </div>
                    <div id="select-type-button">
                    <label for="uniqueCheckbox">유니크</label>
                    <input type="checkbox" id="uniqueCheckbox" name="style" value="29">
                    </div>
                    <div id="select-type-button">
                    <label for="retroCheckbox">레트로</label>
                    <input type="checkbox" id="retroCheckbox" name="style" value="30">
                    </div>
                    <div id="select-type-button">
                    <label for="lovelyCheckbox">러블리</label>
                    <input type="checkbox" id="lovelyCheckbox" name="style" value="31">
                    </div>
                    <div id="select-type-button">
                    <label for="moderncasualCheckbox">모던캐주얼</label>
                    <input type="checkbox" id="moderncasualCheckbox" name="style" value="32">
                    </div>
                </div>
            </div>

            <div id="fixed-button-div">
                <button id="applyFilter" class="jw-btn" type="submit" id="applyFilter">스타일 보기</button>
            </div>
            </div>
        </div>
    </div>
</div>

</div>
<div id= "main-wrapper-bottom">
<div id="infinite-scroll">
    <div id="photo-gallery">
        <%-- <c:forEach items="${postVOList}" var="post" varStatus="loop">
             <div class="photo" onclick="moveToPost('${post.postId}')">
                 <img src="${post.thumbnailUrl}" alt="사진 ${loop.index}">
             </div>
             </c:forEach> --%>
    </div>
</div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/resources/js/postList.js"></script>
    <script src="/resources/js/filterModal.js"></script>
</div>
</div>

</body>
</html>