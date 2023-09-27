package com.kosa5.hyunique.banner.service;

import java.util.List;

import com.kosa5.hyunique.banner.vo.BannerVO;
import com.kosa5.hyunique.user.vo.UserVO;

public interface BannerService {
    List<BannerVO> getAllBanners();
	List<UserVO> getRandomUsers(int userId);

}
