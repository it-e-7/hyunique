package com.kosa5.hyunique.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/")
public class MemberController {
	@Value("${key.KAKAO}")
	private String kakaoApiKey;
	
	@Autowired
	private MemberService ms;
	
	
	//로그인 화면 이동
	@RequestMapping(value="/login")
    public String login(Model model) {
		 model.addAttribute("kakaoApiKey", kakaoApiKey);
        return "login";
    }
	
	
	//카카오 API 호출
	@RequestMapping(value="/KakaoLogin", method=RequestMethod.GET)
	public String kakaoLogin(@RequestParam(value = "code", required = false) String code) throws Exception {
		System.out.println("#########" + code);
		
			String access_Token = ms.getAccessToken(code);
			
			HashMap<String, Object> userInfo = ms.getUserInfo(access_Token);
			System.out.println("###access_Token#### : " + access_Token);
			System.out.println("###nickname#### : " + userInfo.get("nickname"));
			System.out.println("###email#### : " + userInfo.get("email"));
			System.out.println("###id#### : " + userInfo.get("id"));
		return "main_temp";
		
    	}

}