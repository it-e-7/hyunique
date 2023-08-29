package com.kosa5.hyunique.closet.vo;

import java.util.List;

import com.kosa5.hyunique.product.vo.ProductDetailVO;

import lombok.Data;

@Data
public class ClosetVO {
	private List<ProductDetailVO> bagList;
	private List<ProductDetailVO> dressList;
	private List<ProductDetailVO> outerList;
	private List<ProductDetailVO> topList;
	private List<ProductDetailVO> bottomList;
	private List<ProductDetailVO> shoesList;
	private List<ProductDetailVO> hatList;
	private List<ProductDetailVO> accessoryList;
}