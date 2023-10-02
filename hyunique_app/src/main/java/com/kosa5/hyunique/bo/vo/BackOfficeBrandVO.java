package com.kosa5.hyunique.bo.vo;

import lombok.Data;

@Data
public class BackOfficeBrandVO {

	private String productBrand;
	private int totalPrice;
	private int totalLike;
	private int totalTag;
	private double tagScore;
}
