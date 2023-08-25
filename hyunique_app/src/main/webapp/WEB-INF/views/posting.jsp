<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>posting</title>
    <%@ include file="/WEB-INF/views/common.jsp"%>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="/hyunique/resources/js/posting.js"></script>
    <link rel="stylesheet" type="text/css"
        href="/hyunique/resources/css/posting.css"/>
</head>
<body>
    <div class="container">
        <div class="header">
            <p>스타일링 공유를 위해 사진을 선택해주세요</p>
        </div>
        <div class="image-container">
            <img src="/hyunique/resources/img/heendy.png" alt="중앙 이미지" />
        </div>
        <div>
            <p>옷이 잘 보이는 선명한 사진이 좋아요!</p>
        </div>

        <div class="button-container">
            <button id="uploadButton">사진 불러오기</button>
            <input type="file" id="fileInput" class="real-upload" style="display:none;" accept="image/*" required multiple>
        </div>
    </div>
    <br>
    <div class="write-container">
            <div class="upload"></div>
            <form action="post" method="post" enctype="multipart/form-data">
                <div class="image-view">
                    <ul id="image-list"></ul>
                    <div class="tag-container" id="tag-container"></div>
                </div>
                <div class="style-button-group">
                    <label>스타일</label>
                    <br>
                    <input type="radio" name="style" value="스트릿">스트릿
                    <input type="radio" name="style" value="이지캐주얼">이지캐주얼
                    <input type="radio" name="style" value="러블리">러블리
                </div>
                <div class="tpo-button-group">
                    <label>상황</label>
                    <br>
                    <input type="radio" name="tpo" value="데이트">데이트
                    <input type="radio" name="tpo" value="데일리">데일리
                </div>
                <div class="season-button-group">
                    <label>시즌</label>
                    <br>
                    <input type="radio" name="season" value="봄">봄
                    <input type="radio" name="season" value="여름">여름
                    <input type="radio" name="season" value="가을">가을
                    <input type="radio" name="season" value="겨울">겨울
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
    <br>
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
