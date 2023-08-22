package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping ("/api/post")
public class PostController {

	@Autowired
	private PostService postService;
	@GetMapping(value = "getList")
	public String getPostingHandler(Model model) {
		PostVO postVO = new PostVO();
		postVO = postService.getOnePost(29);
		System.out.println("postVO check  -- "+postVO);
		model.addAttribute(postVO);
		return "postList";
	}
	
}
