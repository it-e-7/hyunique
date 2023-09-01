package com.kosa5.hyunique.closet.mapper;

import java.util.List;
import java.util.Map;

public interface ClosetMapper {
    List<Map<String, Object>> getClosetByUserId(int userId);
}
