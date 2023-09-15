<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
     <%@ include file="/WEB-INF/views/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="/resources/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/postList.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/gpt.css" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gpt chat</title>
</head>
 

<body>
	<%@ include file="/WEB-INF/views/header.jsp"%>
	 <div id= "hyunique-main-top-recommend">
          <div class="button selected" id="recommend">추천</div>
          <div class="button" id="style-ranking">스타일랭킹</div>
          <div class="button" id="following">팔로우</div>
    </div>
	<!-- 헤더 제외 gpt화면 전체 -->
	<div class="main-gpt-wrapper">
		<!-- gpt 채팅창 전체 -->
		
	    <div class="chat-section-wrapper">
	    </div>
	    
	    <!-- 유저 입력 섹션 전체 -->
	    <div class="user-input-section">
	    	<div class="chat-refresh-btn-section">
	    	</div>
	    	<div class="chat-input-section">
   				<input class="user-gpt-input" type="text" name="user-gpt-input" placeholder="입력">	        			
	    	</div>
	    	<div class="chat-send-btn-section">
	    		<button class="btn-gpt-request">입력</button>
	    	</div>
	    </div>
	</div>
	
	<script src="/resources/js/gpt.js"></script>
</body>
</html>