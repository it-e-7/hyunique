package com.kosa5.hyunique.user.service;

import java.util.List;

import com.kosa5.hyunique.user.vo.PostVO;
import com.kosa5.hyunique.user.vo.UserVO;

public interface UserService {
	public String insertOrGetUser(String inputValue, String inputType);

	UserVO getUserInfoAndFollowerCount(int userId);

	public void updateUser(UserVO user);

    List<PostVO> getPostsByUserId(Integer userId);

}
