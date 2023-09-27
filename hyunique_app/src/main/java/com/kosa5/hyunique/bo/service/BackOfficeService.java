package com.kosa5.hyunique.bo.service;

import java.util.List;

import com.kosa5.hyunique.bo.vo.BackOfficeProductVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

public interface BackOfficeService {

	int adminLogin(String adminId, String adminPw);
	
	List<ProductDetailVO> getQRCount(int day);

	List<BackOfficeProductVO> getHotProduct(int day);

}
