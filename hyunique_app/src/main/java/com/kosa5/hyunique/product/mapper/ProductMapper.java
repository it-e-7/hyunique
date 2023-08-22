package com.kosa5.hyunique.product.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Mapper
public interface ProductMapper {

	ProductDetailVO getProductDetailById(String productId);
}
