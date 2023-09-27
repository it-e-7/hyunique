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
	<!-- 컬러와 사이즈 모달 -->
        <div id="product-search-modal" class="modal">
          <div class="modal-content">
              <div class="modal-wrap">
                  <div class='color-wrap'>
                      <select class="select-product-color empty">
                      <option value="" disabled selected>컬러</option>
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
                  <button class="modal-cancel-btn-gpt" type="button">취소</button>
                  <button class="modal-check-btn" type="submit">확인</button>
              </div>
          </div>
        </div>

		<!-- gpt 채팅창 전체 -->
	
	    <div class="chat-section-wrapper">
	    	<div class="gap-area"></div>
	    </div>
        <input type="button" id="sample3_search" value="우편번호 찾기" onclick='<c:if test="${not empty user.userAddress}">paymentInformation("${user.userAddress}");</c:if> <c:if test="${empty user.userAddress}">sample3_execDaumPostcode(${user.userId}); </c:if>'><br>

        <div id="modal-wrap">
            <div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
            <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
            </div>
            <div id="address-modal">
                <div id="address-wrap">
                    <input type="text" id="sample3_address" class="d_form" placeholder="주소">
                    <input type="text" id="sample3_detailAddress" class="d_form" placeholder="상세주소">
                    <input type="text" id="sample3_extraAddress" class="d_form" placeholder="참고항목">
                    <div id="address-button-list">
                        <button id="address-cancel-button" class="modal-cancel-btn">다시찾기</button>
                        <button id="address-apply-button" class="modal-check-btn">주소저장</button>
                    </div>
                </div>
            </div>

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
	<script src="/resources/js/posting/modal.js"></script>
    <script src="/resources/js/gptModal.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script src="/resources/js/daumAddress.js"></script>
	<script>
		AOS.init();
	</script>	
</body>
</html>