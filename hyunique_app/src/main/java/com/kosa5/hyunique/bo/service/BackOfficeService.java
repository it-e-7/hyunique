package com.kosa5.hyunique.bo.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kosa5.hyunique.bo.vo.BackOfficeBannerVO;
import com.kosa5.hyunique.bo.vo.BackOfficeBrandVO;
import com.kosa5.hyunique.bo.vo.BackOfficeProductVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

public interface BackOfficeService {

	int adminLogin(String adminId, String adminPw);
	
	List<ProductDetailVO> getQRCount(int day);

	List<BackOfficeProductVO> getHotProduct(int day);

	List<BackOfficeBrandVO> getHotBrand(int day);

	List<BackOfficeBannerVO> getAllBanner();

	int deleteBanner(int displayOrder);
	
	int upBanner(int displayOrder);
	
	int downBanner(int displayOrder);

	void uploadBanner(MultipartFile banner, String bannerName);

}
