package com.kosa5.hyunique.user.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.kosa5.hyunique.user.vo.PostVO;
import com.kosa5.hyunique.user.vo.UserVO;

@Mapper
public interface UserMapper {
	void insertOrGetUser(Map<String, Object> params);

	UserVO getUserInfoAndFollowerCount(int userId);

	void updateUser(UserVO user);

	List<PostVO> getPostsByUserId(Integer userId);

}
