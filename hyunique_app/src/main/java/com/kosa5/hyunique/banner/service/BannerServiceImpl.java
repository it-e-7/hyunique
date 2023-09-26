package com.kosa5.hyunique.banner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.banner.mapper.BannerMapper;
import com.kosa5.hyunique.banner.vo.BannerVO;

@Service
public class BannerServiceImpl implements BannerService{
	 
    @Autowired
    private BannerMapper bannerMapper;

    @Override
    public List<BannerVO> getAllBanners() {
        return bannerMapper.selectAllBanners();
    }
}
