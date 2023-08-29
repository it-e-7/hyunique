package com.kosa5.hyunique.closet.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.kosa5.hyunique.closet.service.ClosetService;
import com.kosa5.hyunique.closet.vo.ClosetVO;

@Controller
@RequestMapping("/")
public class ClosetController {

	Logger log = LogManager.getLogger("case3");

	@Autowired
	private ClosetService closetService;

	@GetMapping("/closet/{userId}")
	@ResponseBody
	public List<ClosetVO> getPostsByUserId(@PathVariable int userId, @SessionAttribute("sessionId") int sessionId) {
		return closetService.getClosetByUserId(userId);
	}
}
