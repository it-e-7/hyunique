package com.kosa5.hyunique.oauth;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.kosa5.hyunique.user.service.UserService;

@Controller
@RequestMapping(value = "/")
public class OAuthController {

	@Value("${key.KAKAO}")
	private String kakaoApiKey;

	@Autowired
	private OAuthService ms;

	@Autowired
	private UserService service;
	
	// NaverLoginBO
	private NaverLoginBO naverLoginBO;
	private String apiResult = null;

	@Autowired
	private void setNaverLoginBO(NaverLoginBO naverLoginBO) {
		this.naverLoginBO = naverLoginBO;
	}
	
	//세션에 id저장
	private void setSessionId(HttpSession session, String id, String type) {
		//받은 Id로 서버에 이미 있으면 시퀀스 아이디 pl/sql out으로 받아오고, 없으면 정보 삽입 후 시퀀스 아이디 받아오기
		service.insertOrGetUser(id, type);
	    session.setAttribute("sessionId", id);
	}

	// 공통 로그인 화면 이동
	@RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
	public String login(Model model, HttpSession session) {
		model.addAttribute("kakaoApiKey", kakaoApiKey);
		String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
		System.out.println("네이버:" + naverAuthUrl);
		model.addAttribute("url", naverAuthUrl);
		return "login";
	}

	// 카카오 API 호출
	@RequestMapping(value = "/KakaoLogin", method = RequestMethod.GET)
	public String kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) throws Exception {
		System.out.println("#########" + code);
		String access_Token = ms.getAccessToken(code);
		HashMap<String, Object> userInfo = ms.getUserInfo(access_Token);
		System.out.println("###access_Token#### : " + access_Token);
		System.out.println("###nickname#### : " + userInfo.get("nickname"));
		System.out.println("###email#### : " + userInfo.get("email"));
		System.out.println("###id#### : " + userInfo.get("id"));
		setSessionId(session, (String) userInfo.get("id"),"kakao");
		return "redirect:userInfo";
	}

	// 네이버 로그인 성공시 callback호출 메소드
	@RequestMapping(value = "/navercallback", method = { RequestMethod.GET, RequestMethod.POST })
	public String callback(Model model, @RequestParam String code, @RequestParam String state, HttpSession session)
			throws IOException, ParseException {
		System.out.println("여기는 callback");
		OAuth2AccessToken oauthToken = naverLoginBO.getAccessToken(session, code, state);
		apiResult = naverLoginBO.getUserProfile(oauthToken);
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(apiResult);
		JSONObject jsonObj = (JSONObject) obj;
		JSONObject response_obj = (JSONObject) jsonObj.get("response");
		String nickname = (String) response_obj.get("nickname");
		String id = (String) response_obj.get("id");
		System.out.println(nickname);
		System.out.println(id);
		session.setAttribute("sessionId", nickname);
		model.addAttribute("result", apiResult);
	    setSessionId(session, (String) response_obj.get("id"),"naver"); // 세션에 ID 저장
		return "redirect:userInfo";
	}
	
	//로그인 성공 후 유저 정보 페이지(임시) 이동
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
    public String example(HttpSession session) {
        String sessionId = (String) session.getAttribute("sessionId");
        if (sessionId != null) {
            System.out.println("세션 ID: " + sessionId);
            
        } else {
            System.out.println("로그인되지 않은 사용자");
            // 로그인되지 않은 사용자 처리
        }
        return "userInfopage";
    }
	// 네이버 로그아웃
	@RequestMapping(value = "/logout", method = { RequestMethod.GET, RequestMethod.POST })
	public String logout(HttpSession session) throws IOException {
		System.out.println("여기는 logout");
		session.invalidate();
		return "redirect:userInfopage";
	}
}
