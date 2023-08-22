package com.kosa5.hyunique.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
		
		System.out.println(detailVO);
		
		model.addAttribute("product", detailVO);
		
		return "product/detail";
	}
}
