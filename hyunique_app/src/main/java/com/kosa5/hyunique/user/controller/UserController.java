package com.kosa5.hyunique.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.PostVO;
import com.kosa5.hyunique.user.vo.UserVO;

@Controller
@RequestMapping("user")
public class UserController {

	private UserService userService;

	Logger log = LogManager.getLogger("case3");
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	// 유저 기본정보 가져오기
	@GetMapping("{userId}")
	public String getUserInfoAndFollowerCount(@PathVariable int userId, HttpSession session, Model model) {
	    String sessionId = (String) session.getAttribute("sessionId");
	    UserVO user = userService.getUserInfoAndFollowerCount(userId);
	    
	    if (user != null) {
	        model.addAttribute("user", user);
	        if (sessionId != null && Integer.parseInt(sessionId) == userId) {
	            model.addAttribute("isCurrentUser", true);
	        }
	    } else {
	        log.info("유저 정보가 존재하지 않음");
	    }
	    model.addAttribute("userId", userId); // 이 부분 추가
	    return "myStylePage";
	}


	// 유저 기본정보 업데이트 화면 이동
	@Auth
	@GetMapping("update")
	public String userUpdatePage(HttpSession session, Model model) {
		String sessionIdString = (String) session.getAttribute("sessionId");
		int sessionId = Integer.parseInt(sessionIdString);
	    UserVO user = userService.getUserInfoAndFollowerCount(sessionId); // 여기에서 변경

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
	        HttpSession session) {
	    if (userId == null) {
	        userId = (Integer) session.getAttribute("sessionId");
	    }
	    return userService.getPostsByUserId(userId);
	}

}
