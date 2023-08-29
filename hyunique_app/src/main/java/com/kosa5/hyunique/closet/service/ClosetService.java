package com.kosa5.hyunique.closet.service;

import com.kosa5.hyunique.closet.vo.ClosetVO;

public interface ClosetService {
    ClosetVO getClosetByUserId(int userId);
}
