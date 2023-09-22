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
            <div class="header"></div>
            <div class="img-section" id="container"></div>
            <button id="openBottomSheet">Open Bottom Sheet</button>
            <div id="bottomSheet" class="hidden">
                <div class="sheet-header">
                    <button id="closeBottomSheet">Close</button>
                </div>
                <div class="img-search-value">
                    <p>상품 검색 결과 입니다.</p>
                    <ul class="img-search-list"></ul>
                </div>
            </div>

        </div>
    </body>
    <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js">
    </script>
    <script src="/resources/js/imgSearch.js"></script>
</html>