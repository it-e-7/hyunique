package com.kosa5.hyunique.payment.controller;

import com.kosa5.hyunique.product.service.ProductService;
import com.kosa5.hyunique.product.vo.ProductDetailVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping(value="/payment")
public class PaymentController {

/*    @Autowired
    private TossPaymentService tossPaymentService;*/

    @Autowired
    private ProductService productService;

    @Value("${api.url}")
    private String API_URL;

    @Value("${test_client_api_key}")
    private  String API_KEY;

    //결제 승인
    @PostMapping(value="confirm")
    @ResponseBody
    public  Map<String, Object> tossOrderService(@SessionAttribute int sessionId, Model model, @RequestBody String[] orderList){
        Map<String, Object> map = new HashMap<String, Object>();
        int totalPrice=0;

        for (String s : orderList) {
            //여기서 이후 데이터베이스에 삽입하는 코드 생성. 우선은 아이템을 찾아 VO리스트들의 가격의 합을 리턴합니다.
            totalPrice= totalPrice+(productService.getProductDetailById(s).getProductPrice());
        }

        //세션아이디와, 가격, 그리고 url , 시크릿 키, URL을 리턴받는다
        map.put("userId",sessionId);
        map.put("totalPrice",totalPrice);
        map.put("apiKey",API_KEY);
        map.put("url",API_URL);

        return map;
    }

}
