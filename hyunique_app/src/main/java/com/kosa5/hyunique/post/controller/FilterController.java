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

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

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
		model.addAttribute("postVOList", postVOList);
		return "ajax_response";
	}
}
