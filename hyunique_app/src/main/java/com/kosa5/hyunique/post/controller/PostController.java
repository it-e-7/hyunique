package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping ("/api/post")
public class PostController {

	@Autowired
	private PostService postService;

	@GetMapping(value = "getOnePost")
	public String getPostingHandler(Model model) {
		PostVO postVO = new PostVO();
		postVO = postService.getOnePost(29);
		model.addAttribute(postVO);
		return "postList";
	}
	@GetMapping(value = "getPostList")
	public String getPostingListHandler(Model model) {
		List<PostVO> postVOList = new ArrayList<>();
		postVOList = postService.findTwelvePostList(21);
		model.addAttribute(postVOList);
		return "postList";
	}

	@GetMapping(value = "getMorePost")
	public String loadMorePost(@RequestParam("page") int page, Model model) {
		List<PostVO> postVOList = new ArrayList<>();
		postVOList = postService.loadMorePost(page);
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
	
}
