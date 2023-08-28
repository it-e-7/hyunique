package com.kosa5.hyunique.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Mapper
public interface ProductMapper {

	ProductDetailVO getProductDetailById(String productId);
	List<PostThumbnailVO> getProductStyleById(@Param("productId") String productId,@Param("offset") int offset);
}
