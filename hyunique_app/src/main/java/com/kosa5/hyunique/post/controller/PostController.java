package com.kosa5.hyunique.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostDetailVO;

@Controller
@RequestMapping("post")
public class PostController {
	
	@Autowired
	PostService postService;

	@GetMapping("{postId}")
	public String getPostDetailHandler(@PathVariable("postId") int postId, Model model) {
		
		PostDetailVO postDetailVO = postService.getPostDetailByPostIdUserId(postId, 22);
		
		model.addAttribute("postVO", postDetailVO);
		
		return "post/detail";
	}
}
