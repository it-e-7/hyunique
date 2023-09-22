<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <div id= "main-wrapper-top">
	    <div id="hyunique-main-top-logo">
         <button id="hyunique-main-top-logo-image" onclick="location.href=`/`;">
                <img src="/resources/img/hyunique.png" />
         </button>
         <div id="hyunique-main-top-buttons">
              <button id="search-button" onclick="displaySearch()">
                <img src="/resources/img/ic-search.png" />
              </button>
              <button id="my-page-button" onclick="redirectToUserPage(${sessionId})">
                <img src="/resources/img/ic-person.png" />
              </button>
         </div>
	    </div>
	    
	    <link rel="stylesheet" type="text/css" href="/resources/css/search.css" />
	    <div class="header-search-area">
	    	<div class="search-area-wrapper">
	    		<div class="search-top-wrapper">
              <button onclick="hideSearch()">
                  <img src="/resources/img/ic-backward.png" />
              </button>
	    			<div class="search-input-wrapper">
	    				<input type="text" id="search-input" placeholder="검색어를 입력하세요" />
	    				<img src="/resources/img/ic-search.png" />
	    			</div>
              <button id="img-search-btn">
                  <img src="/resources/img/ic-search-camera.png" />
                  <input type="file" id="imgInput" style="display:none;" accept="image/*">
              </button>
	    		</div>
	    		<ul class="product-list">
	    		</ul>
	    	</div>
      </div>
	    <script src="/resources/js/search.js"></script>
	    <script src="/resources/js/mypage.js"></script>
	    <script src="/resources/js/common.js"></script>
	</div>