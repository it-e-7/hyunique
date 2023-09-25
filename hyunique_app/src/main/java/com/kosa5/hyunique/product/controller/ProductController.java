package com.kosa5.hyunique.product.controller;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostThumbnailVO;
import com.kosa5.hyunique.product.service.ProductService;
import com.kosa5.hyunique.product.vo.ProductDetailVO;
import com.kosa5.hyunique.product.vo.ProductInformVO;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("product")
public class ProductController {

	Logger log = LogManager.getLogger("case3");
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
		return productService.getProductStyleById(productId, (page - 1) * 12);
	}

	@GetMapping("/search/{productName}")
	@ResponseBody
	public List<PostProductVO> getSearchProduct(@PathVariable("productName") String productName) {
		List<PostProductVO> value = productService.getSearchProductList(productName);
		return value;
	}
	
	@PostMapping("/nsearch")
	@ResponseBody
	public List<PostProductVO> getnSearchProduct(String keyword, int offset) {
		List<PostProductVO> value = productService.getnSearchProductList(keyword, offset);
		return value;
	}
	
	@PostMapping("img-search")
	@ResponseBody
	public List<PostProductVO> postImageSearchProduct(MultipartFile image) {
		log.info("image crop {}", image);
		return productService.getImageSearchProduct(image);
	}
	
	@GetMapping("/inform")
	@ResponseBody
    public ProductInformVO getProductSizeAndColor(@RequestParam("productId") String productId) {

        ProductInformVO vo = productService.getProductSizeAndColor(productId);

        return vo;
    }

	@GetMapping("/img-search")
	public String showImageSearchView() {
		return "imgSearch";
	}

}
