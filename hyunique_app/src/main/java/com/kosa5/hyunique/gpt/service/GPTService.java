package com.kosa5.hyunique.gpt.service;

import com.kosa5.hyunique.user.vo.UserVO;

public interface GPTService {
    String chatGPT(String message,UserVO signinUser);

	String generateImage(String message);

	String translate(String keyword);

}
