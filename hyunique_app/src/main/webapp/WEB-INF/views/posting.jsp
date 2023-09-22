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
        <div class="header-wrapper">
            <button onclick="backward()">
                <img src="/resources/img/ic-backward.png" />
            </button>
        </div>
        <div class="pre-wrapper">
            <div class="header">
                <p>스타일링을 공유해주세요</p>
            </div>
            <div class="image-description-container">
	            <div class="image-container">
	                <img src="/resources/img/pre-main.png" alt="중앙 이미지"/>
	            </div>
	            <div class="body">
	                <p>옷이 잘 보이는 선명한 사진이 좋아요!</p>
	            </div>
            </div>
        </div>
        <div class="button-container">
            <button id="img-load-button" class="jw-btn jw-btn-fixed">사진 불러오기</button>
            <input type="file" id="fileInput" class="thumbnail-upload" style="display:none;" accept="image/*">
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
                                <button type="button" id="add-img-btn">
                                    <img src="/resources/img/add-img.png">
                                </button>
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
            <button type="button" id="upload-button" class="jw-btn jw-btn-fixed">작성 완료하기</button>
        </div>
    </div>

    <div class="search-container">
        <div class="header">
            <div class="header-wrapper">
                <button class="back-icon" onclick="goBack()">
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
                    <div class="modal-wrap">
                        <div class='color-wrap'>
                            <select class="select-product-color empty">
                                <option value="" disabled selected>색상</option>
                            </select>
                            <span class="select-input__icon">
                                <svg class="icon" width="10" height="10" preserveAspectRatio="xMidYMid meet" style="fill: currentcolor;">
                                    <path fill-rule="evenodd" d="M0 3l5 5 5-5z"></path>
                                </svg>
                            </span>
                        </div>
                        <div class='size-wrap'>
                            <select class="select-product-size empty">
                                <option value="" disabled selected>사이즈</option>
                            </select>
                            <span class="select-input__icon">
                                <svg class="icon" width="10" height="10" preserveAspectRatio="xMidYMid meet" style="fill: currentcolor;">
                                    <path fill-rule="evenodd" d="M0 3l5 5 5-5z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="modal-btn-wrap">
                        <button class="modal-cancel-btn" type="button">취소</button>
                        <button class="modal-check-btn" type="submit">확인</button>
                    </div>
                </div>
            </div>

            <div class="result-wrapper">
                <div class="title-wrapper">
                    <p class="search-value"></p>
                    <p class="search-value-fixed"></p>
                </div>
                <ul class="result-list"></ul>
            </div>
        </div>
    </div>

    <div class="post-container">
        <div class="post-wrapper">
            <div class="header">
                <p>게시가 완료되었습니다!</p>
            </div>
            <div class="image-container" id="post-image-thumbnail">
            </div>
            <div class="post-content-wrap">
                <div class="tag-container">
                    <ul class="tag-list"></ul>
                </div>
                <div class="content-text"></div>
            </div>
            <div class="button-container">
                <button id="next-button" class="jw-btn jw-btn-fixed" onclick="moveHome()">계속하기</button>
            </div>
        </div>
    </div>
</body>
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js">
</script>
<script src="/resources/js/posting/posting.js"></script>
<script src="/resources/js/posting/modal.js"></script>
<script src="/resources/js/posting/pin.js"></script>
</html>
