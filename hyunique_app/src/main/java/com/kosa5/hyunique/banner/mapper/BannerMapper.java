package com.kosa5.hyunique.banner.mapper;

import java.util.List;

import com.kosa5.hyunique.post.vo.BannerVO;

public interface BannerMapper {
    List<BannerVO> selectAllBanners();
}
