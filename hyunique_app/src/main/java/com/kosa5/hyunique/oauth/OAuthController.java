package com.kosa5.hyunique.oauth;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.user.service.UserService;

@Controller
@RequestMapping(value = "/")

public class OAuthController {

	Logger log = LogManager.getLogger("case3");

	@Value("${key.KAKAO}")
	private String kakaoApiKey;
	
	@Value("${api.url}")
	private String API_URL;

	@Autowired
	private OAuthService ms;

	@Autowired
	private UserService service;

	// NaverLoginBO
	@Autowired
	private NaverLoginBO naverLoginBO;
	private String apiResult = null;

	// 세션에 id저장
	private void setSessionId(HttpSession session, String id, String type) {
		try {
			session.setAttribute("sessionId", service.insertOrGetUser(id, type));
		} catch (NullPointerException e) {
			log.info("로그인 혹은 회원가입 실패");
		}
	}

	// 공통 로그인 화면 이동
	@Auth(role = Auth.Role.UNAUTH)
	@RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
	public String login(Model model, HttpSession session) {
		model.addAttribute("kakaoApiKey", kakaoApiKey);
		model.addAttribute("API_URL", API_URL);
		String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
		model.addAttribute("url", naverAuthUrl);
		return "login";
	}

	// 카카오 API 호출
	@RequestMapping(value = "/KakaoLogin", method = RequestMethod.GET)
	public String kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session)
			throws Exception {
		String access_Token = ms.getAccessToken(code);
		HashMap<String, Object> userInfo = ms.getUserInfo(access_Token);
		setSessionId(session, (String) userInfo.get("id"), "kakao");
		return "redirect:userInfo";
	}

	// 네이버 로그인 성공시 callback호출 메소드
	@RequestMapping(value = "/navercallback", method = { RequestMethod.GET, RequestMethod.POST })
	public String callback(Model model, @RequestParam String code, @RequestParam String state, HttpSession session)
			throws IOException, ParseException {
		OAuth2AccessToken oauthToken = naverLoginBO.getAccessToken(session, code, state);
		apiResult = naverLoginBO.getUserProfile(oauthToken);
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(apiResult);
		JSONObject jsonObj = (JSONObject) obj;
		JSONObject response_obj = (JSONObject) jsonObj.get("response");
		String nickname = (String) response_obj.get("nickname");
		String id = (String) response_obj.get("id");
		session.setAttribute("sessionId", nickname);
		model.addAttribute("result", apiResult);
		setSessionId(session, (String) response_obj.get("id"), "naver"); // 세션에 ID 저장
		return "redirect:userInfo";
	}

	// 로그인 성공 후 유저 정보 페이지(임시) 이동
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
	public String example(HttpSession session) {
		String sessionId = (String) session.getAttribute("sessionId");
		if (sessionId != null) {
			log.info("세션 ID: " + sessionId);

		} else {
			log.info("로그인되지 않은 사용자");
			// 로그인되지 않은 사용자 처리
		}
		return "redirect:/";
	}

	// 네이버 로그아웃
	@RequestMapping(value = "/logout", method = { RequestMethod.GET, RequestMethod.POST })
	public String logout(HttpSession session) throws IOException {
		session.invalidate();
		return "redirect:userInfopage";
	}
}
