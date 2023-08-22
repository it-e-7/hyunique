package com.kosa5.hyunique.product.vo;

import java.util.List;

import lombok.Data;

@Data
public class DepartStockVO {

	private int storeId;
	private String storeName;
	private String productId;
	private List<StockVO> stockList;
}
