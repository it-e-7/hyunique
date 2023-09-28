package com.kosa5.hyunique.banner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.banner.mapper.BannerMapper;
import com.kosa5.hyunique.banner.vo.BannerVO;
import com.kosa5.hyunique.user.vo.UserVO;

@Service
public class BannerServiceImpl implements BannerService{
	 
    @Autowired
    private BannerMapper bannerMapper;

    @Override
    public List<BannerVO> getAllBanners() {
        return bannerMapper.selectAllBanners();
    }

	@Override
	public List<UserVO> getRandomUsers(int userId) {
		return bannerMapper.selectRandomUsers(userId);
	}

	@Override
	public List<UserVO> getUserRanking() {
		return bannerMapper.selectUserRanking();
	}
}
