package com.kosa5.hyunique.bo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kosa5.hyunique.bo.vo.BackOfficeProductVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Mapper
public interface BackOfficeMapper {

	int selectAdmin(@Param("adminId") String adminId, @Param("adminPw") String adminPw);
	
	List<ProductDetailVO> selectQRCount(int day);
	
	List<BackOfficeProductVO> selectHotProduct();

}
