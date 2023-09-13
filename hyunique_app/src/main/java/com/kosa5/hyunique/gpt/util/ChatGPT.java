package com.kosa5.hyunique.gpt.util;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Component
public class ChatGPT {

    public static String callGPT3Api(String inputText) {
        String apiKey = "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";  // GPT-3 API 키를 여기에 입력하세요.
        OkHttpClient client = new OkHttpClient();

        MediaType JSON = MediaType.get("application/json; charset=utf-8");

        // messages 배열과 그 안의 객체를 만듭니다.
        JSONArray messages = new JSONArray();
        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "system");
        userMessage.put("content", "어울리는 스타일링의 아이템을 json형태로 출력해줘.");
        messages.put(userMessage);

        JSONObject assistantMessage = new JSONObject();
        assistantMessage.put("role", "user");
        assistantMessage.put("content", inputText);
        messages.put(assistantMessage);

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", messages);

        // 요청 본문을 만듭니다.
        RequestBody body = RequestBody.create(JSON, requestBody.toString());

        // 이전 코드
        // Before: RequestBody body = RequestBody.create(JSON, "{\"model\":\"gpt-3.5-turbo\", \"prompt\":\"" + inputText + "\", \"max_tokens\": 100}");

        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .addHeader("Authorization", "Bearer " + apiKey)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred";
        }
    }
}
