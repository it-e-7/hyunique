package com.kosa5.hyunique.product.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.vo.ProductDetailVO;
import com.kosa5.hyunique.product.vo.ProductInformVO;

public interface ProductService {

	ProductDetailVO getProductDetailById(String productId);
	List<PostThumbnailVO> getProductStyleById(String productId, int offset);

	List<PostProductVO> getSearchProductList(String productName);

	List<PostProductVO> getnSearchProductList(String keyword, int offset);

	ProductInformVO getProductSizeAndColor(String productId);
	
	List<PostProductVO> getImageSearchProduct(MultipartFile image);
	
	void postQRTag(String productId);

}
