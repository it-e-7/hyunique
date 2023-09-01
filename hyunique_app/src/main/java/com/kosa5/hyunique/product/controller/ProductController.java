package com.kosa5.hyunique.product.controller;

import java.util.List;

import com.kosa5.hyunique.post.vo.PostProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.service.ProductService;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Controller
@RequestMapping("product")
public class ProductController {

	@Autowired
	ProductService productService;
	
	@GetMapping("{productId}")
	public String getProduct(@PathVariable("productId") String productId, Model model) {
		
		ProductDetailVO detailVO = productService.getProductDetailById(productId);
		
		model.addAttribute("product", detailVO);
		
		return "product/detail";
	}
	
	@GetMapping("style")
	public String getProductStyle(@RequestParam("productId") String productId, Model model) {
		ProductDetailVO detailVO = productService.getProductDetailById(productId);
		model.addAttribute("product", detailVO);
		
		return "product/style";
	}
	
	@GetMapping("style/post")
	@ResponseBody
	public List<PostThumbnailVO> getProductPost(@RequestParam("productId") String productId, @RequestParam("page") int page) {
		return productService.getProductStyleById(productId, (page - 1) * 3);
	}

	// 태그 상품 검색
	@GetMapping("/search")
	public String requestSearch() {
		return "/search";
	}

	@GetMapping("/search/{productName}")
	@ResponseBody
	public List<PostProductVO> getSearchProduct(@PathVariable("productName") String productName) {
		List<PostProductVO> value = productService.getSearchProductList(productName);
		return value;
	}

}
