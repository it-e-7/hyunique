package com.kosa5.hyunique.gpt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.gpt.service.GPTService;

import lombok.extern.java.Log;

@Log
@Controller
@RequestMapping("gpt")
public class GPTController {
	@Autowired
    private GPTService GPTService; // 서비스를 주입
	
	@GetMapping("page")
	public String chatgpt() {
		return "gptChat";
	}
	
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public @ResponseBody Map<String, String> chat(@RequestParam String message, Model model) {
	  String response = GPTService.chatGPT(message);
	  Map<String, String> result = new HashMap<>();
	  result.put("response", response);
	  return result; 
	}

}