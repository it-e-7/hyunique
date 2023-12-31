package com.kosa5.hyunique.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosa5.hyunique.interceptor.annotation.Auth;

public class AuthInterceptor implements HandlerInterceptor{

	Logger log = LogManager.getLogger("case3");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		log.debug(handler);
		
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		
		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
		PostMapping post = handlerMethod.getMethodAnnotation(PostMapping.class);
		GetMapping get = handlerMethod.getMethodAnnotation(GetMapping.class);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		ObjectMapper mapper = new ObjectMapper();

		// Auth 어노테이션이 안붙어있으면 모든 사용자가 접근 가능
		if (auth == null) {
			return true;
		}

		// 세션 확인
		HttpSession session = request.getSession(false);
		
		// 인증된 유저만 접근 가능한 경우
		if(auth.role().toString().equals("AUTH")) {
			// 세션이 아예 없는 경우
			if(session == null) {
				if(post != null) {
					response.getWriter().write(mapper.writeValueAsString("{\"redirect\":\"/login\", \"msg\":\"로그인을 해주세요\"}"));
				} if(get != null) {
					response.sendRedirect("/login");
				}
				return false;
			}
			String sessionId = (String) session.getAttribute("sessionId");
			// 세션은 있으나 로그인이 안된 경우
			if(sessionId == null) {
				if(post != null) {
					response.getWriter().write(mapper.writeValueAsString("{\"redirect\":\"/login\", \"msg\":\"로그인을 해주세요\"}"));
				} if(get != null) {
					response.sendRedirect("/login");
				}
				return false;
			}
		} 
		
		// 인증 안된 유저만 접근 가능한 경우
		else if(auth.role().toString().equals("UNAUTH")) {
			// 세션이 있고 로그인한 상태면 접근 불가능
			if(session != null) {
				String sessionId = (String) session.getAttribute("sessionId");
				log.debug("UNAUTH: Session ID: " + sessionId);  // 여기서 세션 ID 출력
				if(sessionId != null) {
					log.debug("UNAUTH: Redirecting because session exists");  // 리다이렉트 실행 로그
					response.sendRedirect("/user/" + sessionId);
					return false;
				}
			}
		}
		
		else if(auth.role().toString().equals("ADMIN")) {
			if(session == null) {
				if(post != null) {
					response.getWriter().write(mapper.writeValueAsString("{\"redirect\":\"/backoffice/login\", \"msg\":\"운영자 로그인을 해주세요\"}"));
				} if(get != null) {
					response.sendRedirect("/backoffice/login");
				}
				return false;
			}
			String adminLog = (String) session.getAttribute("adminLog");
			// 세션은 있으나 로그인이 안된 경우
			if(adminLog == null) {
				if(post != null) {
					response.getWriter().write(mapper.writeValueAsString("{\"redirect\":\"/backoffice/login\", \"msg\":\"운영자 로그인을 해주세요\"}"));
				} if(get != null) {
					response.sendRedirect("/backoffice/login");
				}
				return false;
			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}
}
