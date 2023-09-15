package com.kosa5.hyunique.gpt.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.gpt.vo.GPTVO;
import com.kosa5.hyunique.user.vo.UserVO;

import lombok.extern.java.Log;

@Log
@Service
public class GPTServiceImpl implements GPTService{
    
    @Value("${api.gptkey}")
    private String API_GPT;
    
    @Value("${api.prompt}")
    private String API_PROMPT;
    
    List<Map<String, String>> conversation = new ArrayList<>();
    
    
    
    
    @Override
    public String chatGPT(String message, UserVO signinUser) {
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = API_GPT;
        String model = "gpt-3.5-turbo"; // current model of chatgpt api
        API_PROMPT = API_PROMPT + (signinUser.getUserSex().equals("M")?"남자":"여자") + Integer.toString(signinUser.getUserHeight()) + "cm" + "체형:" + signinUser.getUserForm() + "선호스타일:" + signinUser.getUserPrefer();
        
        try {
            //HTTP 요청 설정
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");

            // 요청 대화 저장
            Map<String, String> convhistroyUser = new HashMap<>();
            convhistroyUser.put("role", "user");
            convhistroyUser.put("content", message);
            conversation.add(convhistroyUser);
            
            
            log.info("전송하기 전 API_PROMPT : "+API_PROMPT);
            // JSON 배열 생성
            JSONArray jsonArr = new JSONArray();
            jsonArr.put(new JSONObject().put("role", "system").put("content", API_PROMPT));
            
            for (Map<String, String> conv : conversation) {
                jsonArr.put(new JSONObject(conv));
            }

            // 요청 본문
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("model", model);
            jsonObj.put("messages", jsonArr);
            
            String body = jsonObj.toString();
            log.info("요청 본몬 : " + body);

            con.setDoOutput(true);
            OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream());
            writer.write(body);
            writer.flush();
            writer.close();

            // 응답 본문
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // 응답 처리

            log.info("응답 본몬 : " + response.toString());
            String responseGpt;
            responseGpt = extractContentFromResponse(response.toString());
            
            // 응답 대화 기록 추가
            Map<String, String> convhistroyAssistant = new HashMap<>();
            convhistroyAssistant.put("role", "assistant");
            convhistroyAssistant.put("content", responseGpt);
            conversation.add(convhistroyAssistant);
            
            return responseGpt;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String extractContentFromResponse(String response) {
    	List<GPTVO> gptvoList = new ArrayList<>(); // VO 리스트 객체 생성

    	try {
			JSONObject jsonResponse = new JSONObject(response);
			JSONArray choices = jsonResponse.getJSONArray("choices");
			JSONObject firstChoice = choices.getJSONObject(0);
			JSONObject message = firstChoice.getJSONObject("message");
			String content = message.getString("content");
			
			// content가 또 다른 JSON 문자열이므로 한번 더 파싱
			JSONObject contentJson = new JSONObject(content);
			
			for (String key : contentJson.keySet()) {
	            JSONObject itemObject = contentJson.getJSONObject(key);
	            GPTVO gptvo = new GPTVO();
	            gptvo.setItem(itemObject.getString("item"));
	            gptvo.setColor(itemObject.getString("color"));
	            gptvoList.add(gptvo); // VO 객체를 리스트에 추가
	        }
	        // 로그 출력 부분
	        log.info("GPTVO List: " + gptvoList.toString());
	        
			return contentJson.toString(4); // JSON 문자열을 보기 좋게 포맷팅
    	} catch (Exception e) {
	        // JSON 파싱에 실패한 경우
			log.warning("JSON 파싱 에러: " + e.getMessage());
			e.printStackTrace();
			return "스타일링에 관련된 질문만 받을 수 있어요";	    
		}
    }


}
