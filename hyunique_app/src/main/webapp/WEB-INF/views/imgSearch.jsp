<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>imgSearch</title>
        <%@ include file="/WEB-INF/views/common.jsp"%>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" type="text/css"
            href="/resources/css/imgSearch.css"/>
    </head>
    <body>
        <div class="show-search-img-result">
            <div class="header-wrapper">
                <button onclick="backward()">
                    <img src="/resources/img/ic-backward.png" />
                </button>
            </div>
            <div class="img-section" id="container">
                <div class="img-section-area"></div>
            </div>
            <div class="explain-seciton">
                <p>찾고자 하는 의상의 영역을 지정해주세요</p>
                <img class="drag-event-ic" src="/resources/img/ic-drag-event.gif"/>
            </div>
            </div>
            <div id="bottomSheet" class="modal">
                <div class="handlebar">
                    <span class="handlebar-icon"></span>
                </div>
                <div class="img-search-value">
                    <p class="search-value-title" draggable="false">상품 검색 결과 입니다.</p>
                    <ul class="img-search-list">
                        <div class="data-layer"></div>
                        <div class="skeleton-layer"></div>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js">
    </script>
    <script src="/resources/js/imgSearch/imgSearch.js"></script>
    <script src="/resources/js/imgSearch/modal.js"></script>
</html>