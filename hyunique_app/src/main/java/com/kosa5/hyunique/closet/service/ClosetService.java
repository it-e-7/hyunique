package com.kosa5.hyunique.closet.service;

import java.util.List;

import com.kosa5.hyunique.closet.vo.ClosetVO;

public interface ClosetService {
    List<ClosetVO> getClosetByUserId(int userId);
}
