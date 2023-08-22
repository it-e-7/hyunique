package com.kosa5.hyunique.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.product.mapper.ProductMapper;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductMapper productMapper;
	
	@Override
	public ProductDetailVO getProductDetailById(String productId) {
		
		return productMapper.getProductDetailById(productId);
	}
}
