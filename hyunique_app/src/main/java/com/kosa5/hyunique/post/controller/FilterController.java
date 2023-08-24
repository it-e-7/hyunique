package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
	public String getFilterPost(@RequestParam("gender") String gender, @RequestParam(value = "tpo[]", required = false) List<String> tpo, Model model) {
		List<PostVO> postVOList = new ArrayList<>();
		postVOList = postService.getfilterPostList(gender,tpo);
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
	
}
