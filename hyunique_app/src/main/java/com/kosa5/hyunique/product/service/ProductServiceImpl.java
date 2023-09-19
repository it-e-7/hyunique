package com.kosa5.hyunique.product.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.mapper.ProductMapper;
import com.kosa5.hyunique.product.vo.ProductDetailVO;
import com.kosa5.hyunique.product.vo.ProductInformVO;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductMapper productMapper;
	
	@Autowired
	SearchService searchService;
	
	@Override
	public ProductDetailVO getProductDetailById(String productId) {
		ProductDetailVO vo = productMapper.getProductDetailById(productId);
		Collections.sort(vo.getStoreList(), (o1, o2) -> {
			return (o1.getStoreId() > o2.getStoreId()) ? 1 : -1;
		});
		return vo;
	}
	
	@Override
	public List<PostThumbnailVO> getProductStyleById(String productId, int offset) {
		return productMapper.getProductStyleById(productId, offset);
	}

	@Override
	public List<PostProductVO> getSearchProductList(String productName) {
		return productMapper.selectSearchProductList(productName);
	}
	
	@Override
	public List<PostProductVO> getnSearchProductList(String keyword, int offset) {
		List<PostProductVO> result = searchService.searchByKeyword(keyword, offset);
		return result;
    }

	@Override
	public ProductInformVO getProductSizeAndColor(String productId) {
		ProductInformVO vo = new ProductInformVO();
		vo.setProductSize(productMapper.selectProductSize(productId));
		vo.setProductColor(productMapper.selectProductColor(productId));

		return vo;
	}
}
