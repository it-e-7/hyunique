package com.kosa5.hyunique.user.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.PostVO;
import com.kosa5.hyunique.user.vo.UserVO;

import lombok.extern.java.Log;

@Log
@Controller
@RequestMapping("user")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	// 유저 기본정보 가져오기
	@GetMapping("{userId}")
	public String getUserInfoAndFollowerCount(HttpSession session, Model model) {
		String sessionId = (String) session.getAttribute("sessionId"); // 세션에서 아이디 가져오기
		if (sessionId != null) {
			int userId = Integer.parseInt(sessionId);
			UserVO user = userService.getUserInfoAndFollowerCount(userId);
			model.addAttribute("user", user);
			session.setAttribute("user", user); // 세션에 UserVO 저장
		} else {
			log.info("세션 아이디가 null");
		}
		return "myStylePage";
	}

	// 유저 기본정보 업데이트 화면 이동
	@GetMapping("update")
	public String userUpdatePage(HttpServletRequest request, Model model) {
		UserVO user = (UserVO) request.getSession().getAttribute("user"); // 세션에서 UserVO 가져오기
		if (user != null) {
			model.addAttribute("user", user);
		} else {
			log.info("user값이 null");
		}
		return "userInfoUpdatePage";
	}

	// 유저 기본정보 업데이트 삽입
	@PostMapping("updateUser")
	public ResponseEntity<String> updateUser(@RequestBody UserVO user, @SessionAttribute int sessionId) {
		System.out.println(sessionId);
		user.setUserId(sessionId);
		try {
			userService.updateUser(user);
			return new ResponseEntity<>("업데이트 성공", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("업데이트 실패", HttpStatus.BAD_REQUEST);
		}
	}

	// 유저 게시글 썸네일 및 URL가져오기
	@GetMapping("userpostlist")
	@ResponseBody
	public List<PostVO> getPostsByUserId(HttpServletRequest request, @RequestParam(required = false) Integer userId,
			@SessionAttribute("sessionId") int sessionId) {
		if (userId == null) {
			userId = sessionId;
		}
		return userService.getPostsByUserId(userId);
	}

}
