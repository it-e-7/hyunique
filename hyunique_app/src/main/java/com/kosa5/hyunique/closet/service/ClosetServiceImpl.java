package com.kosa5.hyunique.closet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.closet.mapper.ClosetMapper;
import com.kosa5.hyunique.closet.vo.ClosetVO;

@Service
public class ClosetServiceImpl implements ClosetService {

	@Autowired
    private ClosetMapper closetMapper;

	 
	@Override
	public List<ClosetVO> getClosetByUserId(int userId) {
        return closetMapper.getClosetByUserId(userId);
	}

}
