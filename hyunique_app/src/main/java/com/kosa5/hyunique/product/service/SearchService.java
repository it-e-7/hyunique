package com.kosa5.hyunique.product.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.product.mapper.ProductMapper;

@Service
public class SearchService {

	@Value("${os.NAME}")
	String openSearchName;

	@Value("${os.PW}")
	String openSearchPassword;

	@Value("${os.URL}")
	String openSearchURL;
	
	@Autowired
	ProductMapper productMapper;

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

			byte[] input = ("{\n" + 
					"  \"from\": " + offset * 10 + ",\n" + 
					"  \"size\": 10,\n" + 
					"  \"query\": {\n" + 
					"    \"bool\": {\n" + 
					"      \"must\": [\n" + 
					"        {\n" + 
					"          \"match\": {\n" + 
					"            \"productName\": \""+keyword+"\"\n" + 
					"          }\n" + 
					"        }\n" + 
					"      ],\n" + 
					"      \"should\": [\n" + 
					"        {\n" + 
					"          \"bool\": {\n" + 
					"            \"must\": [\n" + 
					"              {\n" + 
					"                \"match\": {\n" + 
					"                  \"productBrand\": \""+keyword+"\"\n" + 
					"                }\n" + 
					"              },\n" + 
					"              {\n" + 
					"                \"match\": {\n" + 
					"                  \"typeName\": \""+keyword+"\"\n" + 
					"                }\n" + 
					"              }\n" + 
					"            ]\n" + 
					"          }\n" + 
					"        },\n" + 
					"        {\n" + 
					"          \"match\": {\n" + 
					"            \"productBrand\": \""+keyword+"\"\n" + 
					"          }\n" + 
					"        }\n" + 
					"      ]\n" + 
					"    }\n" + 
					"  },\n" + 
					"  \"min_score\": 15\n" + 
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
			for (int i = 0; i < productList.size(); i++) {
				result.add(gson.fromJson(productList.get(i).getAsJsonObject().get("_source"), PostProductVO.class));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public List<PostProductVO> searchByImage(MultipartFile image) {
		// 요청 URL
		String reqUrl = "http://localhost:8000/img-search";

		// 결과값 담을 변수
		List<String> result = new ArrayList<String>();
		
		List<PostProductVO> productList = new ArrayList<PostProductVO>();

		HttpURLConnection con = null;

		try {
			URL url = new URL(reqUrl);

			con = (HttpURLConnection) url.openConnection();

			// http method 설정
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/json;utf-8");

			// 연결
			con.setDoOutput(true);
			con.connect();
			
			// 송신할 데이터 전송.
			OutputStream dos = con.getOutputStream();
			String base64Img = new String(Base64.getEncoder().encode(image.getBytes()));
			byte[] input = ("{\n" + 
					"    \"image\":\""+ base64Img +"\"\n" + 
					"}").getBytes();
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
			result = Arrays.asList(response.substring(1, response.length() - 1).replaceAll("\"", "").split(","));
			productList = productMapper.selectProductByIdList(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productList;
	}
}
