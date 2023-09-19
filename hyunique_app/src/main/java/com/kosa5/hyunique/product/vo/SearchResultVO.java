package com.kosa5.hyunique.product.vo;

import java.util.List;

import com.kosa5.hyunique.post.vo.PostProductVO;

import lombok.Data;

@Data
public class SearchResultVO {

	private List<PostProductVO> hits;
}
