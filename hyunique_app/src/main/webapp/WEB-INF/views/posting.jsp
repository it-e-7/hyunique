<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>posting</title>
    <%@ include file="/WEB-INF/views/common.jsp"%>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="/resources/js/posting.js"></script>
    <link rel="stylesheet" type="text/css"
        href="/resources/css/posting.css"/>
</head>
<body>
    <div class="header-wrapper">
        <button onclick="backward()">
            <img src="/resources/img/ic-backward.png" />
        </button>
    </div>

    <div class="pre-container">
        <div class="header">
            <p>스타일링을 공유해주세요</p>
        </div>
        <div class="image-container">
            <img src="/resources/img/heendy.png" alt="중앙 이미지" />
        </div>
        <div class="body">
            <p>옷이 잘 보이는 선명한 사진이 좋아요!</p>
        </div>

        <div class="button-container">
            <button id="img-load-button" class="jw-btn">사진 불러오기</button>
            <input type="file" id="fileInput" class="real-upload" style="display:none;" accept="image/*" required multiple>
        </div>
    </div>

    <div class="write-container">
            <div class="upload"></div>
            <form action="post" method="post" enctype="multipart/form-data">
                <div class="image-view">
                    <ul id="image-list"></ul>
                    <div class="tag-container" id="tag-container">
                    </div>
                </div>
                <div class="style-button-group">
                    <p>스타일</p>
                    <div>
                        <c:forEach var="tag" items="${['미니멀', '이지캐주얼', '비즈니스캐주얼', '스트릿', '원마일웨어', '유니크', '러블리', '아메카지','시티보이']}">
                            <div>
                                <input type="checkbox" id="${tag}" onclick="handleCheckBoxState('${tag}')">
                                <label for="${tag}">${tag}</label>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <div class="tpo-button-group">
                    <p>상황</p>
                    <div>
                        <c:forEach var="tag" items="${['코사', '여행', '캠퍼스', '카페', '데이트', '결혼식', '출근', '데일리']}">
                            <div>
                                <input type="checkbox" id="${tag}" onclick="handleCheckBoxState('${tag}')">
                                <label for="${tag}">${tag}</label>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <div class="season-button-group">
                    <p>시즌</p>
                    <div>
                        <c:forEach var="tag" items="${['봄', '여름', '가을', '겨울']}">
                            <div>
                                <input type="checkbox" id="${tag}" onclick="handleCheckBoxState('${tag}')">
                                <label for="${tag}">${tag}</label>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <div class="content-group">
                    <p>내용</p>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <button type="button" id="upload-button" class="jw-btn">작성 완료하기</button>
                </div>
            </form>
    </div>

    <div class="search-container">
            <div class="header">
                <button onclick="backward()">뒤로가기</button>
                <input type="text" id="search-input" placeholder="검색어를 입력하세요">
                <button id="search-btn">검색</button>
            </div>

            <div class="search-body">
                <p class="search-value"></p>
                <p>상품 검색 결과입니다.</p>

                <ul class="result-list">

                </ul>
            <div>
    </div>

    <div class="post-container">
            <div class="header">
                <p>게시가 완료되었습니다!</p>
            </div>
            <div class="post-image-container">
            </div>
            <div class="tag-container">
            </div>
            <button type="button" id="next-button">계속하기</button>
    </div>
</body>
</html>
