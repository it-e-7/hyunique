package com.kosa5.hyunique.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostVO;

import java.util.ArrayList;
import java.util.List;

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
	
	@PostMapping("like")
	@ResponseBody
	public int postLikePostHandler(int postId) {
		int userId = 22;
		return postService.postLikePost(postId, userId);
	}
	
	@PostMapping("unlike")
	@ResponseBody
	public int postUnlikePostHandler(int postId) {
		int userId = 22;
		return postService.postUnlikePost(postId, userId);
	}

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
