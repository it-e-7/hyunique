package com.kosa5.hyunique.user.service;

import com.kosa5.hyunique.user.vo.UserVO;

public interface UserService {
	public String insertOrGetUser(String inputValue, String inputType);

	UserVO getUserInfoAndFollowerCount(int userId);

}
