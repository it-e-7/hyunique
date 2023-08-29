package com.kosa5.hyunique.closet.mapper;

import java.util.List;

import com.kosa5.hyunique.closet.vo.ClosetVO;

public interface ClosetMapper {
    List<ClosetVO> getClosetByUserId(int userId);
}
