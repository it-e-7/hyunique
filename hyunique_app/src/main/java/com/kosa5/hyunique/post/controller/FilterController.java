package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping ("/api/filter")
public class FilterController {

	@Autowired
	private PostService postService;

	@GetMapping(value = "getFilterPost")
	public String getFilterPost(@ModelAttribute FilterPostVO filterPostVO) {
		List<PostVO> postVOList = new ArrayList<>();
		postVOList = postService.getfilterPostList(filterPostVO);
		return "ajax_response";
	}
	
}
