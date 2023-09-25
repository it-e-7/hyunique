package com.kosa5.hyunique.post.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostVO;

@Controller
@RequestMapping ("/filter")
public class FilterController {

	@Autowired
	private PostService postService;

	@GetMapping(value = "getFilterPost")
	public String getFilterPost(HttpSession session, @ModelAttribute FilterPostVO filterPostVO, Model model) {
		List<PostVO> postVOList = new ArrayList<>();
		if(session.getAttribute("sessionId")!=null){
			Integer sessionId = Integer.parseInt((String)session.getAttribute("sessionId"));
			filterPostVO.setUserId(sessionId);
		}
		postVOList = postService.getfilterPostList(filterPostVO);
		System.out.println(filterPostVO);
		List<Integer> postIdList = new ArrayList<Integer>();
		for(int i = 0; i < postVOList.size(); i++) {
			postIdList.add((Integer) postVOList.get(i).getPostId());
		}
		System.out.println(postIdList);
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
}
