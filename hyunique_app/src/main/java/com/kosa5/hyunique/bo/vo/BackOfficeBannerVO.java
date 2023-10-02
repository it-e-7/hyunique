package com.kosa5.hyunique.bo.vo;

import lombok.Data;

@Data
public class BackOfficeBannerVO {
	
	private Long bannerId;
    private String bannerName;
    private String bannerUrl;
    private int displayOrder;
}
