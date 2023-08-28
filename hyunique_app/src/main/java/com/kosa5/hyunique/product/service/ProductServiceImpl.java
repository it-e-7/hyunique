package com.kosa5.hyunique.product.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.mapper.ProductMapper;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductMapper productMapper;
	
	@Override
	public ProductDetailVO getProductDetailById(String productId) {
		ProductDetailVO vo = productMapper.getProductDetailById(productId);
		Collections.sort(vo.getStoreList(), (o1, o2) -> {
			return (o1.getStoreId() > o2.getStoreId()) ? 1 : -1;
		});
		return vo;
	}
	
	@Override
	public List<PostThumbnailVO> getProductStyleById(String productId, int offset) {
		return productMapper.getProductStyleById(productId, offset);
	}
}
