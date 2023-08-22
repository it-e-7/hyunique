package com.kosa5.hyunique.product.vo;

import java.util.List;

import lombok.Data;

@Data
public class ProductDetailVO {
	
	private String productId;
	private String productName;
	private int productPrice;
	private String productBrand;
	private String productImg;
	private String productUrl;
	private String typeName;
	private List<DepartStockVO> storeList;
}
