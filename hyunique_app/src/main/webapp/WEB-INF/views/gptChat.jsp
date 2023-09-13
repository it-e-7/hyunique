<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/views/common.jsp"%>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenAI를 이용한 챗봇</title>
</head>
<body>
    <h1>Chat with GPT</h1>
<input id="user-gpt-input" type="text" name="user-gpt-input" placeholder="입력">	        			
<button class="btn-submit jw-btn" id="btn-user-gpt-input">입력</button>
<p>Response: <span id="response-content">${response}</span></p>
<script src="/resources/js/gpt.js"></script>

</body>
</html>