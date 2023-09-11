package com.kosa5.hyunique.user.service;

import java.util.List;
import java.util.Map;

import com.kosa5.hyunique.user.vo.PostVO;
import com.kosa5.hyunique.user.vo.UserVO;

public interface UserService {
//	public String insertOrGetUser(String inputValue, String inputType);
	public Map<String, Object> insertOrGetUser(String inputValue, String inputType);

	UserVO getUserInfoAndFollowerCount(int userId);

	public void updateUser(UserVO user);

	List<PostVO> getPostsByUserId(Integer userId);

	public int followByUserId(int follower, int following);
	
	public int unfollowByUserId(int follower, int following);
	
}
