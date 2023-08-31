<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
            <button id="uploadButton">사진 불러오기</button>
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
                    <label>스타일</label>
                    <span><input type="radio" name="style" value="21">미니멀</span>
                    <span><input type="radio" name="style" value="22">이지캐주얼</span>
                    <span><input type="radio" name="style" value="23">비즈니스캐주얼</span>
                    <span><input type="radio" name="style" value="24">아메카지</span>
                    <span><input type="radio" name="style" value="25">스트릿</span>
                    <span><input type="radio" name="style" value="26">시티보이</span>
                    <span><input type="radio" name="style" value="27">원마일웨어</span>
                    <span><input type="radio" name="style" value="28">스포티</span>
                    <span><input type="radio" name="style" value="29">유니크</span>
                    <span><input type="radio" name="style" value="30">레트로</span>
                    <span><input type="radio" name="style" value="31">러블리</span>
                    <span><input type="radio" name="style" value="32">모던캐주얼</span>
                </div>
                <div class="tpo-button-group">
                    <label>상황</label>
                    <br>
                    <input type="radio" name="tpo" value="21">코사
                    <input type="radio" name="tpo" value="22">여행
                    <input type="radio" name="tpo" value="23">캠퍼스
                    <input type="radio" name="tpo" value="24">카페
                    <input type="radio" name="tpo" value="25">데이트
                    <input type="radio" name="tpo" value="26">결혼식
                    <input type="radio" name="tpo" value="27">출근
                    <input type="radio" name="tpo" value="28">데일리
                </div>
                <div class="season-button-group">
                    <label>시즌</label>
                    <br>
                    <input type="radio" name="season" value="21">봄
                    <input type="radio" name="season" value="22">여름
                    <input type="radio" name="season" value="23">가을
                    <input type="radio" name="season" value="24">겨울
                </div>
                <div class="form-group">
                    <label for="content">내용</label>
                    <br>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <button type="button" id="upload-button">작성 완료하기</button>
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
