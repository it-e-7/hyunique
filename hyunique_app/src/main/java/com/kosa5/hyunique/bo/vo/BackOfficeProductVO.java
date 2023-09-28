package com.kosa5.hyunique.bo.vo;

import lombok.Data;

@Data
public class BackOfficeProductVO {

	private String productId;
	private double score;
	private String productImg;
	private String productBrand;
	private String productName;
	private int postId;
	private int maxLike;
	private String thumbnailUrl;
	private String userNickname;
	private int totalLike;
	private int totalTag;
}
