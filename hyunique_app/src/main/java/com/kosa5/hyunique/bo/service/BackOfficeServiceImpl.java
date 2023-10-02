package com.kosa5.hyunique.bo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosa5.hyunique.bo.mapper.BackOfficeMapper;
import com.kosa5.hyunique.bo.vo.BackOfficeBannerVO;
import com.kosa5.hyunique.bo.vo.BackOfficeBrandVO;
import com.kosa5.hyunique.bo.vo.BackOfficeProductVO;
import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Service
public class BackOfficeServiceImpl implements BackOfficeService{

	@Autowired
	BackOfficeMapper boMapper;
	
	@Autowired
	S3Service s3Service;
	
	@Override
	public int adminLogin(String adminId, String adminPw) {
		return boMapper.selectAdmin(adminId, adminPw);
	}
	
	@Override
	public List<ProductDetailVO> getQRCount(int day) {
		return boMapper.selectQRCount(day);
	}
	
	@Override
	public List<BackOfficeProductVO> getHotProduct(int day) {
		return boMapper.selectHotProduct(day);
	}
	
	@Override
	public List<BackOfficeBrandVO> getHotBrand(int day) {
		return boMapper.selectHotBrand(day);
	}
	
	@Override
	public List<BackOfficeBannerVO> getAllBanner() {
		return boMapper.selectAllBanner();
	}
	
	@Override
	public int deleteBanner(int displayOrder) {
		return boMapper.deleteBanner(displayOrder);
	}
	
	@Override
	public int upBanner(int displayOrder) {
		return boMapper.upBanner(displayOrder);
	}
	
	@Override
	public int downBanner(int displayOrder) {
		return boMapper.downBanner(displayOrder);
	}
	
	@Override
	public void uploadBanner(MultipartFile banner, String bannerName) {
		
		String bannerUrl = s3Service.uploadImgFiles(banner, bannerName + ".jpg", "banner/");
		boMapper.insertBanner(bannerUrl, bannerName);
		
	}
}
