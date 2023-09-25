package com.kosa5.hyunique.payment.controller;

import com.kosa5.hyunique.payment.service.TossPaymentImpl;
import com.kosa5.hyunique.payment.service.TossPaymentService;
import com.kosa5.hyunique.product.service.ProductService;
import com.kosa5.hyunique.product.vo.ProductDetailVO;
import com.kosa5.hyunique.user.service.UserService;
import com.kosa5.hyunique.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
@RequestMapping(value="/payment")
public class PaymentController {

    @Autowired
    private TossPaymentService tossPaymentService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Value("${api.url}")
    private String API_URL;

    @Value("${test_client_api_key}")
    private  String API_KEY;

    private int productTotalPrice;

    //결제 승인
    @PostMapping(value="confirm")
    @ResponseBody
    public  Map<String, Object> tossOrderService(@SessionAttribute int sessionId, Model model, @RequestBody String[] orderList){
        Map<String, Object> map = new HashMap<String, Object>();
        List <ProductDetailVO> productList = new ArrayList<>();

        int totalPrice=0;

        for (String s : orderList) {
            //여기서 이후 데이터베이스에 삽입하는 코드 생성. 우선은 아이템을 찾아 VO리스트들의 가격의 합을 리턴합니다.
            ProductDetailVO currentProduct = productService.getProductDetailById(s);
            totalPrice= totalPrice+(currentProduct.getProductPrice());
            //결제완료 페이지를 위해 구매하는 상품들에 대한 데이터를 같이 전송합니다.
            productList.add(currentProduct);
        }
        productTotalPrice = totalPrice;
        //세션아이디와, 가격, 그리고 url , 시크릿 키, URL, productList를 리턴받는다
        map.put("userId",sessionId);
        map.put("totalPrice",totalPrice);
        map.put("apiKey",API_KEY);
        map.put("url",API_URL);
        map.put("productList",productList);

        return map;
    }

    @PostMapping(value="purchaseLog")
    public String purchaseLogService(@SessionAttribute int sessionId, Model model, @RequestBody String[] orderList){
        //유저의 결제내역 생성
        String orderId = tossPaymentService.TossPurchaseService(sessionId,productTotalPrice);
        // 결제 내역에 따른 상품 데이터 로그 삽입
        for (String s : orderList) {
            tossPaymentService.insertPurchaseProduct(orderId,s);
        }
        return "paymentSuccess" ;
    }

    @GetMapping(value="success")
    public String paymentSuccess(@SessionAttribute int sessionId, Model model){
        //결제를 위해 시도합니다. 우선적으로 일회용 사용을 위해 데이터를 저장하지 않습니다.
        //로그인 유저의 세션 - 결제자
        UserVO loginUser = userService.getUserInfoAndFollowerCount(sessionId,"103");
        model.addAttribute("userName",loginUser.getUserNickname());
        //결제 날짜를 갖고옵니다
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        model.addAttribute("confirmTime",formattedDateTime);
        model.addAttribute("url",API_URL);
        //주문번호, 결제금액, 결제상품에 대한 정보는 Ajax요청으로 받아옵니다

        //데이터베이스에 저장

        return "paymentSuccess";
    }

}
