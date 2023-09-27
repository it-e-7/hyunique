<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/footer.css" />
</head>
<body>
	<footer class="footer-wrapper">
	  <nav class="footer-section">
	    <div class="footer-home-wrapper">
	      <div class="footer-img-wrapper">
	      	<a href="/">
  		        <img src="/resources/img/ico-nav-home.png" id="footer-home-img" width="24" alt="홈" class="footer-img" >
	      	</a>
	      </div>
	    </div>
	    <div class="footer-ai-wrapper" >
	      <div class="footer-ai-img-wrapper">
	      	<a href="/gpt/page">
	        	<img src="/resources/img/ico-nav-ai.png" id="footer-ai-img" width="24" alt="ai" class="footer-img">
	        </a>
	      </div>
	    </div>
	    <div class="footer-qr-wrapper">
	      <div class="footer-img-wrapper" >
      	      <a href="/post/getQRPage">
      	      	<img src="/resources/img/ico-nav-qr.png" id="footer-qr-img" width="24" alt="qr" class="footer-img">
      	      </a>
	      </div>
	    </div>
	    <div class="footer-my-wrapper" onclick="redirectToUserPage(${sessionId})">
	      <div class="footer-img-wrapper">
	        <img src="/resources/img/ico-nav-my.png" id="footer-my-img" width="24" alt="MY" class="footer-img">
	      </div>
	    </div>
	  </nav>
	</footer>
</body>
<script src="/resources/js/mypage.js"></script>
</html>