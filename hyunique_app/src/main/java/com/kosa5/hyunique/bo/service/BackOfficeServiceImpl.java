package com.kosa5.hyunique.bo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.bo.mapper.BackOfficeMapper;
import com.kosa5.hyunique.bo.vo.BackOfficeProductVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Service
public class BackOfficeServiceImpl implements BackOfficeService{

	@Autowired
	BackOfficeMapper boMapper;
	
	@Override
	public int adminLogin(String adminId, String adminPw) {
		return boMapper.selectAdmin(adminId, adminPw);
	}
	
	@Override
	public List<ProductDetailVO> getQRCount(int day) {
		return boMapper.selectQRCount(day);
	}
	
	@Override
	public List<BackOfficeProductVO> getHotProduct(int day) {
		return boMapper.selectHotProduct(day);
	}
}
