package com.kosa5.hyunique.bo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BackOfficeMapper {

	int selectAdmin(@Param("adminId") String adminId, @Param("adminPw") String adminPw);

}
