<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kosa5.hyunique.post.vo.PostVO" %>


        <c:forEach items="${postVOList}" var="post" varStatus="loop">
            <div class="photo">
                <img src="${post.thumbnailUrl}" alt="사진 ${loop.index}">
            </div>
        </c:forEach>