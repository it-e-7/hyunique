package com.kosa5.hyunique.product.service;

import java.util.Collections;

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
		ProductDetailVO vo = productMapper.getProductDetailById(productId);
		Collections.sort(vo.getStoreList(), (o1, o2) -> {
			return (o1.getStoreId() > o2.getStoreId()) ? 1 : -1;
		});
		return vo;
	}
}
