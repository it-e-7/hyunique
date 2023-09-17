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
    
    private int conversationCount = 0;  // 새로운 변수 추가

    List<Map<String, String>> conversation = new ArrayList<>();
    
    
    
    
    @Override
    public String chatGPT(String message, UserVO signinUser) {
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = API_GPT;
        String model = "gpt-3.5-turbo"; // current model of chatgpt api
        conversationCount++;
       
        try {
            //HTTP 요청 설정
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");
            
            message = message +(signinUser.getUserSex().equals("M")?"성별 : 남자, ":"성별 : 여자, ") + Integer.toString(signinUser.getUserHeight()) + "cm, " + "체형:" + signinUser.getUserForm() + ", 선호스타일:" + signinUser.getUserPrefer();
            // 요청 대화 저장
            Map<String, String> convhistroyUser = new HashMap<>();
            convhistroyUser.put("role", "user");
            convhistroyUser.put("content", message);
            conversation.add(convhistroyUser);
            
            if (conversation.size() > 5) {
                conversation.remove(0);
            }
            
            // JSON 배열 생성
            JSONArray jsonArr = new JSONArray();
            if(conversationCount%3==1) {
                jsonArr.put(new JSONObject().put("role", "system").put("content", API_PROMPT));
            }
            for (Map<String, String> conv : conversation) {
                jsonArr.put(new JSONObject(conv));
            }

            // 요청 본문
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("model", model);
            jsonObj.put("messages", jsonArr);
            
            String body = jsonObj.toString();
            log.info("요청 본몬 : \n" + body);

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

            log.info("응답 본몬 : \n" + response.toString());
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
    		int jsonStartIndex = response.indexOf("{");
            if (jsonStartIndex == -1) {
                log.warning("JSON 시작 문자 '{'를 찾을 수 없습니다.");
    			return "스타일링에 관련된 질문만 받을 수 있어요<br><br>'주말에 바닷가 갈건데 스타일링 추천해줘<br><br>와 같이 상황이나 장소를 말해보세요";	    
            }
            String jsonStr = response.substring(jsonStartIndex);
            
			JSONObject jsonResponse = new JSONObject(jsonStr);
			JSONArray choices = jsonResponse.getJSONArray("choices");
			JSONObject firstChoice = choices.getJSONObject(0);
			JSONObject message = firstChoice.getJSONObject("message");
			String content = message.getString("content");
			
			// content가 또 다른 JSON 문자열이므로 한번 더 파싱
			 int jsonContentStartIndex = content.indexOf("{");
		        if (jsonContentStartIndex == -1) {
		            log.warning("content 내 JSON 시작 문자 '{'를 찾을 수 없습니다.");
					return "스타일링에 관련된 질문만 받을 수 있어요<br><br>'주말에 바닷가 갈건데 스타일링 추천해줘<br><br>와 같이 상황이나 장소를 말해보세요";	    
		        }
		        String jsonContentStr = content.substring(jsonContentStartIndex);
		        JSONObject contentJson = new JSONObject(jsonContentStr);
		        
			for (String key : contentJson.keySet()) {
	            JSONObject itemObject = contentJson.getJSONObject(key);
	            GPTVO gptvo = new GPTVO();
	            gptvo.setItem(itemObject.getString("item"));
	            gptvo.setColor(itemObject.getString("color"));
	            gptvoList.add(gptvo); // VO 객체를 리스트에 추가
	        }
	        // 로그 출력 부분
	        log.info("GPTVO List: " + gptvoList.toString());
			return contentJson.toString(4);
    	} catch (Exception e) {
			log.warning("JSON 파싱 에러: " + e.getMessage());
			e.printStackTrace();
			return "스타일링에 관련된 질문만 받을 수 있어요<br><br>'주말에 바닷가 갈건데 스타일링 추천해줘<br><br>와 같이 상황이나 장소를 말해보세요";	    
		}
    }

    @Override
    public String generateImage(String message) {
        String url = "https://api.openai.com/v1/images/generations"; // Image generation API URL
        String apiKey = API_GPT;

        try {
            // HTTP 요청 설정
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");
            // 요청 본문
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("prompt", message); 
            jsonObj.put("n", 1); 
            jsonObj.put("size", "360x640"); 
            String body = jsonObj.toString();
            
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
            System.out.println("이미지 url : \n" + response.toString());
            JSONObject jsonResponse = new JSONObject(response.toString());
            JSONArray dataArr = jsonResponse.getJSONArray("data");
            JSONObject firstData = dataArr.getJSONObject(0);
            String imageUrl = firstData.getString("url");
            if (imageUrl.endsWith("/")) {
                imageUrl = imageUrl.substring(0, imageUrl.length() - 1);
            }
            
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
