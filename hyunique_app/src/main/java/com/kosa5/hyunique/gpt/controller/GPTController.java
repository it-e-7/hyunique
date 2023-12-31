package com.kosa5.hyunique.gpt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.kosa5.hyunique.gpt.service.GPTService;
import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.UserVO;

import lombok.extern.java.Log;

@Log	
@Controller
@RequestMapping("gpt")
public class GPTController {
	@Autowired
    private GPTService GPTService; // 서비스를 주입
	
	@Autowired
	private UserService userService; // 유저 서비스 주입

	@Autowired
	ProductService productService; // 제품 서비스 주입
	
	@Auth
	@GetMapping("page")
	public String chatgpt(@SessionAttribute int sessionId, Model model) {
		String sesisonString = Integer.toString(sessionId);
		UserVO user = userService.getUserInfoAndFollowerCount(sessionId,sesisonString);
		model.addAttribute("user",user);
		return "gptChat";
	}
	
	@Auth
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public @ResponseBody Map<String, String> chat(@RequestParam String message, Model model, @SessionAttribute UserVO signinUser) {
		String response = GPTService.chatGPT(message,signinUser);
		Map<String, String> result = new HashMap<>();
		result.put("response", response);
		return result; 
	}
	
	@Auth
	@RequestMapping(value = "/img", method = RequestMethod.GET)
	@ResponseBody
	public String imgUrl(@RequestParam String message1,@RequestParam String message2, Model model, @SessionAttribute UserVO signinUser) {
		String imgresponse = GPTService.generateImage(message1, message2);
		return imgresponse; 
	}

	@RequestMapping(value= "/product", method = RequestMethod.GET)
	@ResponseBody
	public List<PostProductVO> productGenerator(){

		String productList = GPTService.getTranslateString();
		List<PostProductVO> value = new ArrayList<>();
		String[] splitStrings = productList.split(",");
		for (String str : splitStrings) {
			List<PostProductVO> productSearchList = productService.getnSearchProductList(str, 0);
			if (!productSearchList.isEmpty()) {
				value.add(productSearchList.get(0));
			}
		}
		return value;

	}

}