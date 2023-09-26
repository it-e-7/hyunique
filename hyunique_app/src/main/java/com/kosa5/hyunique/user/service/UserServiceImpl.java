package com.kosa5.hyunique.user.service;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.user.mapper.UserMapper;
import com.kosa5.hyunique.user.vo.PostVO;
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
	public Map<String, Object> insertOrGetUser(String inputValue, String inputType) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("inputValue", inputValue);
	    params.put("inputType", inputType);
	    params.put("userId", Types.INTEGER);
	    params.put("isNew", Types.INTEGER);  // 새로운 필드 추가
	    userMapper.insertOrGetUser(params);  // UserMapper를 사용하여 쿼리 실행

	    return params;
	}


	@Override
	public UserVO getUserInfoAndFollowerCount(int userId, String sessionId) {
		
		return userMapper.getUserInfoAndFollowerCount(userId, sessionId);
	}

	@Override
	public void updateUser(UserVO user) {
		userMapper.updateUser(user);
	}

	@Override
	public List<PostVO> getPostsByUserId(Integer userId) {
		return userMapper.getPostsByUserId(userId);
	}
	
	@Override
	public int followByUserId(int follower, int following) {
		return userMapper.insertFollower(follower, following);
	}
	
	@Override
	public int unfollowByUserId(int follower, int following) {
		return userMapper.deleteFollower(follower, following);
	}
	
	@Override
	public List<UserVO> getFollowerByUserId(int userId) {
		return userMapper.getFollowerByUserId(userId);
	}

	@Override
	public List<UserVO> getFollowingByUserId(int userId) {
		return userMapper.getFollowingByUserId(userId);
	}
	@Override
	public List<UserVO> getLikeByPostId(int postId) {
		return userMapper.getLikeByPostId(postId);
	}

}
