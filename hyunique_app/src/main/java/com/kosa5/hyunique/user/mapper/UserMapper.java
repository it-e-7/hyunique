package com.kosa5.hyunique.user.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
	void insertOrGetUser(Map<String, Object> params);
	
}
