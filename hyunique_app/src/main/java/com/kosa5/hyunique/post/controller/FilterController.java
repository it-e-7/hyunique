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
	public String getFilterPost(@RequestParam(value = "gender", required = false) String gender,
								@RequestParam(value = "tpo[]", required = false) List<String> tpo,
								@RequestParam(value = "season[]", required = false) List<String> season,
								@RequestParam(value = "mood[]", required = false) List<String> mood,
								@RequestParam(value = "minHeight", required = false) Integer minHeight,
								@RequestParam(value = "maxHeight", required = false) Integer maxHeight,
								Model model) {
/*		System.out.println(gender);
		System.out.println(tpo);
		System.out.println(season);
		System.out.println(mood);*/
		List<PostVO> postVOList = new ArrayList<>();
		postVOList = postService.getfilterPostList(gender,tpo,season,mood,minHeight,maxHeight);
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
	
}
