<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>스타일의 완성 HYUNIQUE</title>
    <%@ include file="/WEB-INF/views/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="/resources/css/postList.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/filterModal.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/main.css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
<div id="session-info">
	<input type="hidden" id="followerCount" value="${followerCount}">
	<input type="hidden" id="userId" value="${userId}">
</div>
<img src="https://oreo-hyunique.s3.ap-northeast-2.amazonaws.com/banner/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7+2023-09-29+%EC%98%A4%ED%9B%84+10.03.30.png" id="tie-banner"/>
<div id="main-wrapper">
    <%@ include file="/WEB-INF/views/header.jsp"%>
    <div id= "hyunique-main-top-recommend">
	    <div class="button selected" id="recommend">추천</div>
	    <div class="button" id="style-ranking">스타일랭킹</div>
	    <div class="button" id="following">팔로우</div>
	    <div class="button" id="AI-recommend" onclick="location.href='${url}gpt/page'">AI추천</div>
	</div>
</div>
<div id= "main-wrapper-bottom">
    <div class="tab-desc-wrapper" id="tab-recommend-txt">
    	<p class="tab-desc-txt" >
    		RECOMMEND
    	</p>
    </div>
    <div class="tab-desc-wrapper" id="tab-ranking-txt">
    	<p class="tab-desc-txt">
    		STYLE
    	</p>
    	<span class="bar"></span>
    	<p class="tab-desc-txt">
    		RANKING
    	</p>
    </div>
    <div class="tab-desc-wrapper" id="tab-follow-txt">
    	<p class="tab-desc-txt">
    		FOLLOW
    	</p>
    </div>
   	<div class="tab-img-desc-wrapper" id="tab-img-follow-txt">
  	  	<p class="tab-img-desc-txt" >
    		추천 팔로우 유저
    	</p>
    	<hr>
    </div>
    <div id="random-users-wrapper">
		<div id="random-users">
		</div>
	</div>
	<div class="tab-img-desc-wrapper" id="tab-img-popular-txt">
  	  	<p class="tab-img-desc-txt" >
    		실시간 인기 스타일링
    	</p>
    	<hr>
    </div>
	<div class="tab-img-desc-wrapper" id="tab-img-my-follow-txt">
  	  	<p class="tab-img-desc-txt" >
    		내 팔로잉 스타일링
    	</p>
    	<hr>
    </div>
    <div id="banner-wrapper">
		<div id="banner">
		</div>
	</div>
	<div class="tab-img-desc-wrapper" id="tab-img-recommend-txt">
  	  	<p class="tab-img-desc-txt" >
    		인기 스타일링
    	</p>
    	<hr>
    </div>
	<div id="ranking-wrapper">
		<div class="ranking-description" id="ranking-header-txt">
			지난 주 최고의 HYUNIQER
		</div>
		<div class="category-description" id="rank-category-desc">
			* 지난 한 주 동안, 해당 유저가 받은 좋아요 개수로 집계됩니다.
		</div>
		<div class="ranking-section">
			<div class="ranking-user-wrapper" id="rank-2nd">
				<div class="ranking-wrapper">
					<img class="ranking-back-img" id="ic-back-2nd-img" src="resources/img/ic-back-2nd.png"/>
				</div>
				<img class="ranking-crown-img" id="ic-crown-2nd-img" src="resources/img/ic-crown-2nd.png"/>
				<img class="ranking-user-img" id="rank-2nd-img" src="https://oreo-hyunique.s3.ap-northeast-2.amazonaws.com/profile/profile_107.jpg"/>
				<div class="user-nickname">유니 </div>
			</div>
			<div class="ranking-user-wrapper" id="rank-1st">
				<div class="ranking-wrapper">
					<img class="ranking-back-img" id="ic-back-1st-img" src="resources/img/ic-back-1st.png"/>
				</div>
				<img class="ranking-crown-img" id="ic-crown-1st-img" src="resources/img/ic-crown-1st.png"/>
				<img class="ranking-user-img" id="rank-1st-img" src="https://oreo-hyunique.s3.ap-northeast-2.amazonaws.com/profile/back_35.jpg"/>
				<div class="user-nickname">우기</div>
			</div>
			<div class="ranking-user-wrapper" id="rank-3rd">
				<div class="ranking-wrapper">
					<img class="ranking-back-img" id="ic-back-3rd-img" src="resources/img/ic-back-3rd.png"/>
				</div>
				<img class="ranking-crown-img" id="ic-crown-3rd-img" src="resources/img/ic-crown-3rd.png"/>
				<img class="ranking-user-img" id="rank-3rd-img" src="https://oreo-hyunique.s3.ap-northeast-2.amazonaws.com/profile/profile_105.jpg"/>
				<div class="user-nickname">지니</div>
			</div>
		</div>
	</div>
    <div id= "hyunique-main-top-filter">
        <button id="filterModalButton" class="filter-img-div">
            <img src="/resources/img/filter.png" />
        </button>
        <c:forEach var="tag" items="${['남', '여', '미니멀', '이지캐주얼', '비즈니스캐주얼', '스트릿', '원마일웨어', '유니크', '러블리', '아메카지','시티보이', '스포티', '레트로']}">
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
                  <label>성별</label>
                  </div>
                  <div class="gender-options">
                      <div id=select-type-button>
                        <label for="maleCheckbox">MEN</label>
                         <input type="checkbox" id="maleCheckbox" name="gender" value="M">
                      </div>
                      <div id=select-type-button>
                         <label for="femaleCheckbox">WOMEN</label>
                         <input type="checkbox" id="femaleCheckbox" name="gender" value="W">
                      </div>
                  </div>
                </div>

                <div id="rs">
                <div class="rs-height" id="type">
                <div id ="heightDiv">
                    <label>키</label>
                </div>
                140cm - 190cm
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
                         <label>상황</label>
                    </div>
                    <div id="tpo-options">
                        <div id=select-type-button>
                        <label for="travelCheckbox">여행 🏖</label>
                        <input type="checkbox" id="travelCheckbox" name="tpo" value="22">
                        </div>
                        <div id=select-type-button>
                        <label for="campusCheckbox">캠퍼스 🎓</label>
                        <input type="checkbox" id="campusCheckbox" name="tpo" value="23">
                        </div>
                        <div id=select-type-button>
                        <label for="cafeCheckbox">카페 ☕</label>
                        <input type="checkbox" id="cafeCheckbox" name="tpo" value="24">
                        </div>
                        <div id=select-type-button>
                        <label for="dateCheckbox">데이트 💄</label>
                        <input type="checkbox" id="dateCheckbox" name="tpo" value="25">
                        </div>
                        <div id=select-type-button>
                        <label for="merryCheckbox">결혼식 👰</label>
                        <input type="checkbox" id="merryCheckbox" name="tpo" value="26">
                        </div>
                        <div id=select-type-button>
                        <label for="officeCheckbox">출근 🧔</label>
                        <input type="checkbox" id="officeCheckbox" name="tpo" value="27">
                        </div>
                        <div id=select-type-button>
                        <label for="dailyCheckbox">데일리 🍴</label>
                        <input type="checkbox" id="dailyCheckbox" name="tpo" value="28">
                        </div>
                    </div>
                </div>

                <div id="type">
                    <div id ="seasonDiv">
                          <label>계절</label>
                    </div>
                        <div id="season-options">
                            <div id="select-type-button">
                            <label for="springCheckbox">봄 🌱</label>
                            <input type="checkbox" id="springCheckbox" name="season" value="21">
                            </div>
                            <div id="select-type-button">
                            <label for="summerCheckbox">여름 ☀</label>
                            <input type="checkbox" id="summerCheckbox" name="season" value="22">
                            </div>
                            <div id="select-type-button">
                            <label for="fallCheckbox">가을 🍂</label>
                            <input type="checkbox" id="fallCheckbox" name="season" value="23">
                            </div>
                            <div id="select-type-button">
                            <label for="winterCheckbox">겨울 ☃</label>
                            <input type="checkbox" id="winterCheckbox" name="season" value="24">
                        </div>
                    </div>
                </div>

                <div id="type">
                    <div id ="seasonDiv">
                         <label>스타일</label>
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
                    <button id="applyFilter" class="jw-btn jw-btn-fixed" type="submit" id="applyFilter">스타일 보기</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  	<div class="tab-img-desc-wrapper" id="ranking-description">
  	  	<p class="tab-img-desc-txt" >
    		실시간 랭킹
    	</p>
    	<hr>
    </div>
        <div id="infinite-scroll">
            <div id="photo-gallery"></div>
            <div id="skeleton-layer"></div>
        </div>
            <c:if test="${empty userId}">
                <div id="bottom-for-login">
                    <div id="bottom-for-logo-img">
                        <img src="/resources/img/hyunique.png" class="login-logo-img">
                    </div>
                    <div id="bottom-login-message">
                    간편하게 가입 후<br>더욱 많은 스타일링을 찾아보세요!
                    </div>
                    <button id="login-block" onclick="location.href='/login'">
                    로그인 하기
                    </button>
                </div>
            </c:if>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="/resources/js/postList.js"></script>
<!--         <script src="/resources/js/postdetail.js"></script>
 -->        <script src="/resources/js/filterModal.js"></script>
        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
		<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
		<script>
			AOS.init();
		</script>	
    </div>
</div>
<div id="up-button" onclick="scrollToTop()">
  <lord-icon
    src="https://cdn.lordicon.com/xdakhdsq.json"
    trigger="loop"
    delay="1500"
    colors="primary:#ffffff"
    state="hover-2"
    style="width:40px;height:40px"
    filter: drop-shadow(0px 58px 23px rgba(0, 0, 0, 0.01)) drop-shadow(0px 33px 20px rgba(0, 0, 0, 0.05)) drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.09)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1));>
</lord-icon>
</div>
</body>
</html>