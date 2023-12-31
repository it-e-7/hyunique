package com.kosa5.hyunique.oauth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
import com.kosa5.hyunique.user.vo.UserVO;

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

	@Autowired
	private NaverLoginBO naverLoginBO;
	private String apiResult = null;

	private String setSessionId(HttpSession session, String id, String type) {
	    try {
	        Map<String, Object> result = service.insertOrGetUser(id, type); // Map 객체를 반환받음
	        String userId = (String) result.get("userId");
	        int isNew = (int) result.get("isNew");  // 새로운 사용자인지 아닌지 확인

	        session.setAttribute("sessionId", userId);
	        UserVO userVO = new UserVO();
	        userVO = service.getUserInfoAndFollowerCount(Integer.parseInt(userId),userId);
	        log.info("userVO:" + userVO);
	        session.setAttribute("signinUser", userVO);
	        log.info("isNew: " + isNew);
	        if(isNew == 1) {
	            return "redirect:/user/onboarding";  // 새로운 사용자인 경우
	        } else {
	            return "redirect:/userInfo";  // 기존 사용자인 경우
	        }

	    } catch (NullPointerException e) {
	        log.info("로그인 혹은 회원가입 실패");
	        return "redirect:/errorPage";
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
	    return setSessionId(session, (String) userInfo.get("id"), "kakao");  // setSessionId의 반환값으로 리디렉션
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
	    String id = (String) response_obj.get("id");
	    return setSessionId(session, id, "naver");  // setSessionId의 반환값으로 리디렉션
	}
	
	// 로그인 성공 후 유저 정보 페이지(임시) 이동
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
	public String example(HttpSession session) {
	    Object sessionIdObj = session.getAttribute("sessionId");
	    if (sessionIdObj != null) {
	        String sessionId = sessionIdObj.toString();
	        log.info("세션 ID: " + sessionId);
	    } else {
	        log.info("로그인되지 않은 사용자");
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
