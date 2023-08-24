package com.kosa5.hyunique.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.UserVO;

@RestController
public class UserController {

	private UserService userService;
	
	@Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
	
	@GetMapping("/user/{userId}")
	public UserVO getUserInfoAndFollowerCount(@PathVariable int userId) {
		UserVO user = userService.getUserInfoAndFollowerCount(userId);
		System.out.println(user);
		return user;
	}
}
