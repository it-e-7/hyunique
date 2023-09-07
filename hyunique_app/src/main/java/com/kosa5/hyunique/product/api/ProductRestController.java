package com.kosa5.hyunique.product.api;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostingVO;
import com.kosa5.hyunique.product.mapper.ProductMapper;
import com.kosa5.hyunique.product.service.ProductService;
import com.kosa5.hyunique.product.vo.ProductInformVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductRestController {

    @Autowired
    ProductService productService;

    @GetMapping("/inform")
    public ProductInformVO getProductSizeAndColor(@RequestParam("productId") String productId) {

        System.out.println("productId = " + productId);
        ProductInformVO vo = productService.getProductSizeAndColor(productId);

        System.out.println("vo = " + vo);
        return vo;
    }
}

