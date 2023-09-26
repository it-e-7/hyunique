package com.kosa5.hyunique.bo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.bo.mapper.BackOfficeMapper;

@Service
public class BackOfficeServiceImpl implements BackOfficeService{

	@Autowired
	BackOfficeMapper boMapper;
	
	@Override
	public int adminLogin(String adminId, String adminPw) {
		return boMapper.selectAdmin(adminId, adminPw);
	}
}
