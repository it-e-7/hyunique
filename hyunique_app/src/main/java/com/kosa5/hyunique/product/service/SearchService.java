package com.kosa5.hyunique.product.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kosa5.hyunique.post.vo.PostProductVO;

@Service
public class SearchService {
	
	@Value("${os.NAME}")
	String openSearchName;
	
	@Value("${os.PW}")
	String openSearchPassword;
	
	@Value("${os.URL}")
	String openSearchURL;

	public List<PostProductVO> searchByKeyword(String keyword, int offset) {
		// API Gateway Endpoint 접근 추가

		// 요청 URL
		String reqUrl = openSearchURL;

		// 결과값 담을 변수
		String result = "";

		HttpsURLConnection con = null;

		try {
			URL url = new URL(reqUrl);

			con = (HttpsURLConnection) url.openConnection();

			String auth = openSearchName + ":" + openSearchPassword;
			String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
			String authHeaderValue = "Basic " + encodedAuth;

			// http method 설정
			con.setRequestMethod("POST");
			con.setRequestProperty("Authorization", authHeaderValue);
			con.setRequestProperty("Content-Type", "application/json;utf-8");
			con.setRequestProperty("Accept", "application/json");

			// 연결
			con.setDoOutput(true);
			con.connect();

			byte[] input = ("{" + 
					"  \"from\": " + offset*10 + "," + 
					"  \"size\": 10, " + 
					"  \"query\": {" + 
					"    \"bool\": {" + 
					"      \"must\": [" + 
					"        {" + 
					"          \"match\": {" + 
					"            \"productName\": \"" + keyword + "\"" + 
					"          }" + 
					"        }" + 
					"      ]," + 
					"      \"should\": [" + 
					"        {" + 
					"          \"match\": {" + 
					"            \"productBrand\": \"" + keyword + "\"" + 
					"          }" + 
					"        }," + 
					"        {" + 
					"          \"match\": {" + 
					"            \"typeName\": \"" + keyword + "\"" + 
					"          }" + 
					"        }" + 
					"      ]" + 
					"    }" + 
					"  }" + 
					"}").getBytes("utf-8");

			// 송신할 데이터 전송.
			OutputStream dos = con.getOutputStream();
			dos.write(input, 0, input.length);
			dos.flush();
			dos.close();

			// 응답 읽기
			BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
			StringBuilder response = new StringBuilder();
			String responseLine = null;
			while ((responseLine = br.readLine()) != null) {
				response.append(responseLine.trim());
			}
			result = response.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return convertToProductList(result);
	}
	
	public List<PostProductVO> convertToProductList(String jsonString) {
		List<PostProductVO> result = new ArrayList<PostProductVO>();
		Gson gson = new Gson();
		
		try {
			JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
			
			JsonObject hits = (JsonObject) jsonObject.get("hits");
			JsonArray productList = hits.getAsJsonArray("hits");
			for(int i = 0; i < productList.size(); i++) {
				result.add(gson.fromJson(productList.get(i).getAsJsonObject().get("_source"), PostProductVO.class));
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}