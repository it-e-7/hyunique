package com.kosa5.hyunique.gpt.service;

import com.kosa5.hyunique.user.vo.UserVO;

import java.util.ArrayList;

public interface GPTService {
    String chatGPT(String message,UserVO signinUser);

	String generateImage(String messageFront, String messageBack);

	String translate(String keyword);

	String getTranslateString ();

}
