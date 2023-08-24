package com.kosa5.hyunique.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
	public String getUserInfoAndFollowerCount(@PathVariable int userId, Model model) {
		UserVO user = userService.getUserInfoAndFollowerCount(userId);
		System.out.println(user);
		model.addAttribute("user", user);
		return "myStylePage";
	}
}
