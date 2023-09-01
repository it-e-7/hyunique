package com.kosa5.hyunique.closet.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.closet.service.ClosetService;
import com.kosa5.hyunique.closet.vo.ClosetVO;

@Controller
@RequestMapping("closet")
public class ClosetController {

	Logger log = LogManager.getLogger("case3");

	@Autowired
	private ClosetService closetService;

	@GetMapping("/{userId}")
	@ResponseBody
	public ClosetVO getCloset(@PathVariable int userId) {
		return closetService.getClosetByUserId(userId);
	}
}
