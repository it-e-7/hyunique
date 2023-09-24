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
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <title>gpt chat</title>
    <script src="https://unpkg.com/siriwave/dist/siriwave.umd.min.js"></script>	
</head>
<body>
	<%@ include file="/WEB-INF/views/header.jsp"%>
	 <div id= "hyunique-main-top-recommend">
	    <div class="tab-deco">🤖</div>
	    <div class="button selected" id="AI-recommend">AI추천</div>
	</div>
	<!-- 헤더 제외 gpt화면 전체 -->
	<div class="main-gpt-wrapper">
		<!-- gpt 채팅창 전체 -->
	
	    <div class="chat-section-wrapper">
	    	<div class="gap-area"></div>
	    </div>
	    <!-- 유저 입력 섹션 전체 -->
	    <div class="user-input-section">
	    	<div class="voice-control-wrapper">
    		    <div id="voice-control"></div>
	    	</div>
	    	<div id="pop-up-img-inst">
		    	<p id="img-search-inst">
		    		버튼을 눌러 옷 이미지 검색을 할 수 있어요!<br>다음 버전을 기대해주세요.
		    	</p>
		    </div>
	    	<div class="loader-wrapper hidden">
		    	<div class="loader">
		  			<span class="loader__inner"></span>
		  			<span class="loader__inner"></span>
	  			</div>
	  			<div class="loader-text-wrapper">
	  				<div class="loader-text">ㅤ</div>
	  			</div>
	    	</div>
	    	
	    	<div class="typing-control-wrapper">
		    	<div class="chat-upload-btn-section">
		    		<lord-icon
					    src="https://cdn.lordicon.com/mecwbjnp.json"
					    trigger="click"
					    colors="primary:#121331,secondary:#1663c7"
					    stroke="40"
						style="width:34.3px;height:34.3px">
					</lord-icon>
		    	</div>
		    	<div class="chat-input-section">
	  				<input class="user-gpt-input" id=resultList type="text" name="user-gpt-input" placeholder="상황이나 장소를 알려주세요">	        			
		    	</div>
		    	<div class="chat-send-btn-section">
		    		<button class="btn-gpt-request" onclick="gptRequest(), scrollToBottom()">전송</button>
		    	</div>
	    	</div>
	    </div>
	</div>
	<script type="text/javascript" src="https://js.tosspayments.com/v1"></script>
	<script src="/resources/js/gpt.js"></script>
    <script src="/resources/js/tossPayment.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
	<script>
		AOS.init();
	</script>	
</body>
</html>