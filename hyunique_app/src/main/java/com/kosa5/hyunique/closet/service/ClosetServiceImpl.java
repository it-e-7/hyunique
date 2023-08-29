package com.kosa5.hyunique.closet.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.closet.mapper.ClosetMapper;
import com.kosa5.hyunique.closet.vo.ClosetVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Service
public class ClosetServiceImpl implements ClosetService {

	 @Autowired
	    private ClosetMapper closetMapper;

	    @Override
	    public ClosetVO getClosetByUserId(int userId) {
	        List<Map<String, Object>> results = closetMapper.getClosetByUserId(userId);
	        ClosetVO closetVO = new ClosetVO();
	        
	        // 리스트 초기화
	        closetVO.setBagList(new ArrayList<>());
	        closetVO.setDressList(new ArrayList<>());
	        closetVO.setOuterList(new ArrayList<>());
	        closetVO.setTopList(new ArrayList<>());
	        closetVO.setBottomList(new ArrayList<>());
	        closetVO.setShoesList(new ArrayList<>());
	        closetVO.setHatList(new ArrayList<>());
	        closetVO.setAccessoryList(new ArrayList<>());
	        
	        for (Map<String, Object> result : results) {
	            String typeName = (String) result.get("TYPE_NAME");
	            ProductDetailVO product = new ProductDetailVO(); // 객체 생성

	            product.setProductId((String) result.get("PRODUCT_ID"));
	            product.setProductName((String) result.get("PRODUCT_NAME"));
	            product.setProductBrand((String) result.get("PRODUCT_BRAND"));
	            product.setProductImg((String) result.get("PRODUCT_IMG"));
	            BigDecimal priceDecimal = (BigDecimal) result.get("PRODUCT_PRICE");
	            product.setProductPrice(priceDecimal.intValue());
	            product.setTypeName(typeName);


			// 매핑된 제품 정보를 ClosetVO 객체에 추가
			switch (typeName) {
				case "가방":
					closetVO.getBagList().add(product);
					break;
				case "원피스":
					closetVO.getDressList().add(product);
					break;
				case "겉옷":
					closetVO.getOuterList().add(product);
					break;
				case "상의":
					closetVO.getTopList().add(product);
					break;
				case "하의":
					closetVO.getBottomList().add(product);
					break;
				case "신발":
					closetVO.getShoesList().add(product);
					break;
				case "모자":
					closetVO.getHatList().add(product);
					break;
				case "액세서리":
					closetVO.getAccessoryList().add(product);
					break;
			}
		}

		return closetVO;
	}
	 
	
}
