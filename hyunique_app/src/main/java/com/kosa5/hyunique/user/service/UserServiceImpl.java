package com.kosa5.hyunique.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.user.mapper.UserMapper;
import com.kosa5.hyunique.user.vo.UserVO;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	public UserServiceImpl(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public String insertOrGetUser(String inputValue, String inputType) {
		Map<String, Object> params = new HashMap<>();
		params.put("inputValue", inputValue);
		params.put("inputType", inputType);
		userMapper.insertOrGetUser(params); // UserMapper를 사용하여 쿼리 실행
		return (String) params.get("userId");
	}

	@Override
	public UserVO getUserInfoAndFollowerCount(int userId) {
		return userMapper.getUserInfoAndFollowerCount(userId);
	}

	@Override
	public void updateUser(UserVO user) {
        userMapper.updateUser(user);
	}

}
