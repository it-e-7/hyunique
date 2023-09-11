package com.kosa5.hyunique.post.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostVO;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping ("/filter")
public class FilterController {

	@Autowired
	private PostService postService;

	@GetMapping(value = "getFilterPost")
	public String getFilterPost(@SessionAttribute("sessionId") Integer sessionId , @ModelAttribute FilterPostVO filterPostVO, Model model) {
		List<PostVO> postVOList = new ArrayList<>();
		if(sessionId!=null){
			filterPostVO.setUserId(sessionId);
		}
		postVOList = postService.getfilterPostList(filterPostVO);
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
}
