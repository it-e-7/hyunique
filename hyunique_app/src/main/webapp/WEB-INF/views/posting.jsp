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
    <link rel="stylesheet" type="text/css"
        href="/resources/css/posting.css"/>
</head>
<body>
    <div class="pre-container">
        <div class="pre-container-inner">
            <div class="header-wrapper">
                <button onclick="backward()">
                    <img src="/resources/img/ic-backward.png" />
                </button>
            </div>
            <div class="pre-wrapper">
                <div class="header">
                    <p>스타일링을 공유해주세요</p>
                </div>
                <div class="image-container">
                    <img src="/resources/img/post-main.jpg" alt="중앙 이미지" style="width : 50px"/>
                </div>
                <div class="body">
                    <p>옷이 잘 보이는 선명한 사진이 좋아요!</p>
                </div>
            </div>
            <div class="button-container">
                <button id="img-load-button" class="jw-btn">사진 불러오기</button>
                <input type="file" id="fileInput" class="thumbnail-upload" style="display:none;" accept="image/*">
            </div>
        </div>
    </div>

    <div class="write-container">
        <div class="header-wrapper">
            <button onclick="goBack()">
                <img src="/resources/img/ic-backward.png" />
            </button>
        </div>
        <div class="upload"></div>
        <div class='post-form'>
            <div class='write-wrapper'>
            <div class="image-view">
                <div id="thumbnail-img"></div>
                    <div class="add-img-wrapper">
                        <ul class="add-img-container">
                            <li>
                                <input type="file" id="addFileInput" class="add-img-upload" style="display:none;" accept="image/*" required multiple>
                                                        <button type="button" id="add-img-btn">+</button>
                            </li>
                        </ul>
                    </div>
                    <div class="tag-container" id="tag-container">
                </div>
            </div>
            <div class="style-button-group">
                <p>스타일</p>
                <div id="style-tags"></div>
            </div>
            <div class="tpo-button-group">
                <p>상황</p>
                <div id="tpo-tags"></div>
            </div>
            <div class="season-button-group">
                <p>시즌</p>
                <div id="season-tags"></div>
            </div>
            <div class="content-group">
                <p>내용</p>
                <textarea id="content" name="content" rows="5" required></textarea>
            </div>
            </div>
            <div class="form-group">
                <button type="button" id="upload-button" class="jw-btn">작성 완료하기</button>
            </div>

        </div>
    </div>

    <div class="search-container">
        <div class="header">
            <div class="header-wrapper">
                <button onclick="goBack()">
                    <lord-icon
                      id="backward-btn"
                        src="https://cdn.lordicon.com/zmkotitn.json"
                        trigger="click"
                        colors="primary:#121331"
                        style="transform: rotateY(180deg);">
                    </lord-icon>

                </button>
                <div class="search-box">
                    <input type="search" class="search-text" id="search-input">
                    <button class="searching" id="search-btn">
                        <img src="/resources/img/ic-search.png" class="search-icon">
                    </button>
                </div>
            </div>
        </div>

        <div class="search-body">
            <div id="product-search-modal" class="modal">
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <div class="modal-wrap">
                        <div class='color-wrap'>
                            <p>색상</p>
                            <ul class="select-product-color"></ul>
                        </div>
                        <div class='size-wrap'>
                            <p>사이즈</p>
                            <ul class="select-product-size"></ul>
                        </div>
                    </div>
                    <input type="button" class='jw-btn' id="search-results-button" value="확인">
                </div>
            </div>
            <p class="search-value"></p>
            <p class="search-value-fixed"></p>
            <ul class="result-list">
            </ul>
        </div>
    </div>

    <div class="post-container">
        <div class="post-wrapper">
            <div class="header">
                <p>게시가 완료되었습니다!</p>
            </div>
            <div class="image-container">
                <img src="/resources/img/heendy.png"/>
            </div>
            <div class="tag-container">
                <ul class="tag-list"></ul>
            </div>
            <div class="content-text"></div>
            <div class="button-container">
                <button id="next-button" class="jw-btn" onclick="moveHome()">계속하기</button>
            </div>
        </div>
    </div>
</body>
<script src="/resources/js/posting/posting.js"></script>
<script src="/resources/js/posting/modal.js"></script>
<script src="/resources/js/posting/pin.js"></script>
</html>
