package com.kosa5.hyunique.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.user.mapper.UserMapper;

@Service
public class UserServicelmpl implements UserService {

	@Autowired
	private UserMapper mapper;
	
	@Override
	public String insertOrGetUser(String inputValue, String inputType) {
		Map<String, Object> params = new HashMap<>();
		params.put("inputValue", inputValue);
		params.put("inputType", inputType);
		mapper.insertOrGetUser(params); // UserMapper를 사용하여 쿼리 실행
		return (String) params.get("userId");
	}

}
