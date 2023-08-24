package com.kosa5.hyunique.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.UserVO;

@Controller
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/user/{userId}")
	public String getUserInfoAndFollowerCount(HttpSession session, Model model) {
		String sessionId = (String) session.getAttribute("sessionId"); // 세션에서 아이디 가져오기
		if (sessionId != null) {
			int userId = Integer.parseInt(sessionId);
			UserVO user = userService.getUserInfoAndFollowerCount(userId);
			System.out.println(user);
			model.addAttribute("user", user);
			session.setAttribute("user", user); // 세션에 UserVO 저장
		} else {
			System.out.println("세션 아이디가 null임");
			// 로그인되지 않은 사용자 처리
		}
		return "myStylePage";
	}

	@GetMapping("/user/update")
	public String userUpdatePage(HttpServletRequest request, Model model) {
		UserVO user = (UserVO) request.getSession().getAttribute("user"); // 세션에서 UserVO 가져오기
		if (user != null) {
			model.addAttribute("user", user);
		} else {
			System.out.println("user값이 null임");
		}
		return "userInfoUpdatePage";
	}

	@PostMapping("/user/updateUser")
	public ResponseEntity<String> updateUser(@RequestBody UserVO user) {
		try {
			userService.updateUser(user);
			return new ResponseEntity<>("업데이트 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("업데이트 실패", HttpStatus.BAD_REQUEST);
		}
	}
}
