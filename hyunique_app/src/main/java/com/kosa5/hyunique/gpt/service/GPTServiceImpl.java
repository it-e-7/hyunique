package com.kosa5.hyunique.gpt.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
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
    
    @Value("${id.NAVER}")
    private String CLIENT_ID;
    
    @Value("${key.NAVER}")
    private String API_NAVER;
    
    private int conversationCount = 0;  // 새로운 변수 추가

    List<Map<String, String>> conversation = new ArrayList<>();
    
    private String engListString;
    private String beforeParseString;
	private int checkParse = 0;

    
    
    @Override
    public String chatGPT(String message, UserVO signinUser) {
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = API_GPT;
        String model = "gpt-3.5-turbo"; // current model of chatgpt api
        conversationCount++;
        checkParse=0;
        try {
            //HTTP 요청 설정
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");
            
//          message = message +(signinUser.getUserSex().equals("M")?". 성별 : 남자, ":"성별 : 여자, ") + Integer.toString(signinUser.getUserHeight()) + "cm, " + "체형:" + signinUser.getUserForm() + ", 선호스타일:" + signinUser.getUserPrefer();
            // 요청 대화 저장
            Map<String, String> convhistroyUser = new HashMap<>();
            convhistroyUser.put("role", "user");
            convhistroyUser.put("content", message);
            conversation.add(convhistroyUser);
            
            if (conversation.size() > 2) {
                conversation.remove(0);
            }
            
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
            engListString = translate(responseGpt);
            if(checkParse==1) {
            	responseGpt = "*" + responseGpt;
            }
            
         
            conversation.remove(conversation.size() -1 );

            // 응답 대화 기록 추가
            Map<String, String> convhistroyAssistant = new HashMap<>();
            if(responseGpt.charAt(0) != '*') {
            	convhistroyAssistant.put("role", "assistant");
	            convhistroyAssistant.put("content", beforeParseString);
	            conversation.add(convhistroyAssistant);
            }
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
                log.warning("1차 에러 처리");
                checkParse = 1;
    			return "스타일링에 관련된 질문만 받을 수 있어요<br><br>'주말에 바닷가 갈건데 스타일링 추천해줘'<br><br>와 같이 상황이나 장소를 말해보세요";	    
            }
            String jsonStr = response.substring(jsonStartIndex);
            
			JSONObject jsonResponse = new JSONObject(jsonStr);
			JSONArray choices = jsonResponse.getJSONArray("choices");
			JSONObject firstChoice = choices.getJSONObject(0);
			JSONObject message = firstChoice.getJSONObject("message");
			String content = message.getString("content");
			beforeParseString = content;
			// content가 또 다른 JSON 문자열이므로 한번 더 파싱
			 int jsonContentStartIndex = content.indexOf("{");
		        if (jsonContentStartIndex == -1) {
		            log.warning("2차 에러처리");
		            checkParse = 1;
					return content;	    
		        }
		        String jsonContentStr = content.substring(jsonContentStartIndex);
		        JSONObject contentJson = new JSONObject(jsonContentStr);
		        
			for (String key : contentJson.keySet()) {
	            JSONObject itemObject = contentJson.getJSONObject(key);
	            GPTVO gptvo = new GPTVO();
	            gptvo.setItemWithColor(itemObject.getString("color")+ " " + itemObject.getString("item"));
	            gptvoList.add(gptvo); // VO 객체를 리스트에 추가
	        }
			
			
			StringBuilder convertList = new StringBuilder();  // StringBuilder 객체 생성
			for(GPTVO gptvo : gptvoList) {
			    String itemWithColor = gptvo.getItemWithColor();  // GPTVO 객체에서 값을 가져옴
			    convertList.append(itemWithColor).append(", ");  // 가져온 값을 StringBuilder에 추가
			}
			String finalConvertList = convertList.toString();  // 마지막으로 StringBuilder의 내용을 String으로 변환
			log.info("finalConvertList : " + finalConvertList);
			
			return finalConvertList;
    	} catch (Exception e) {
			log.warning("3차 에러 처리 " + e.getMessage());
			checkParse = 1;
			e.printStackTrace();
            conversation.remove(conversation.size() -1 );
			return beforeParseString;	    
		}
    }

    @Override
    public String generateImage(String messageFront, String messageBack) {
        String url = "https://api.openai.com/v1/images/generations";
        String apiKey = API_GPT;

        try {
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("prompt", messageFront + engListString + messageBack);
            jsonObj.put("n", 1);
            jsonObj.put("size", "256x256");
            String body = jsonObj.toString();
            log.info("이미지 생성 요청 본몬 : \n" + body);

            con.setDoOutput(true);
            OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream());
            writer.write(body);
            writer.flush();
            writer.close();

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                log.info("이미지 url : \n" + response.toString());
                JSONObject jsonResponse = new JSONObject(response.toString());
                JSONArray dataArr = jsonResponse.getJSONArray("data");
                JSONObject firstData = dataArr.getJSONObject(0);
                String imageUrl = firstData.getString("url");
                if (imageUrl.endsWith("/")) {
                    imageUrl = imageUrl.substring(0, imageUrl.length() - 1);
                }

                return imageUrl;
            } else {
                log.warning("Received error code: " + responseCode);
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                String inputLine;
                StringBuffer errorResponse = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    errorResponse.append(inputLine);
                }
                in.close();
                log.warning("Error response: " + errorResponse.toString());
                throw new RuntimeException("Server returned HTTP response code: " + responseCode);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    
    @Override
    public String translate(String keyword) {
        String result = "";
        try {
            String text = URLEncoder.encode(keyword, "UTF-8");
            String param = "source=ko&target=en&text=" + text;

            URL url = new URL("https://openapi.naver.com/v1/papago/n2mt"); // 파파고 API 주소
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestProperty("X-Naver-Client-Id", CLIENT_ID);
            con.setRequestProperty("X-Naver-Client-Secret", API_NAVER);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setUseCaches(false);
            con.setDefaultUseCaches(false);

            OutputStreamWriter osw = new OutputStreamWriter(con.getOutputStream());
            osw.write(param);
            osw.flush();
            
            // 응답 코드 확인
            int responseCode = con.getResponseCode();
            String responseMsg = con.getResponseMessage();
            
            // 서버 응답 내용 확인
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            System.out.print("번역 들어옴" + keyword);
            System.out.print("번역 응답 코드" + responseCode);
            System.out.print("번역 응답 내용" + responseMsg);

            
            // JSON 응답 파싱
            if (responseCode == 200) {
            	JSONParser jsonParser = new JSONParser();
            	org.json.simple.JSONObject simpleJsonObject = (org.json.simple.JSONObject) jsonParser.parse(sb.toString());
            	String jsonString = simpleJsonObject.toJSONString();
            	JSONObject jsonObject = new JSONObject(jsonString);
                JSONObject jsonMessage = (JSONObject) jsonObject.get("message");
                JSONObject jsonResult = (JSONObject) jsonMessage.get("result");
                String translatedText = (String) jsonResult.get("translatedText");
                System.out.print("text : " + translatedText);
                result = translatedText;
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = "";
        }
        return result;
    }

}