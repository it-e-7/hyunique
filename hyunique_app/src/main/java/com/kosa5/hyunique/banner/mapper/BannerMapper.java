package com.kosa5.hyunique.banner.mapper;

import java.util.List;

import com.kosa5.hyunique.banner.vo.BannerVO;
import com.kosa5.hyunique.user.vo.UserVO;

public interface BannerMapper {
    List<BannerVO> selectAllBanners();
	List<UserVO> selectRandomUsers(int userId);
	List<UserVO> selectUserRanking();
}
