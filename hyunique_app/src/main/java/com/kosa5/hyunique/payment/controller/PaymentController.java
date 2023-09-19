package com.kosa5.hyunique.payment.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value="/payment")
public class PaymentController {

/*    @Autowired
    private TossPaymentService tossPaymentService;*/

    @Value("${api.url}")
    private String API_URL;

    //결제 승인
    @GetMapping(value="confirm")
    public String tossOrderService(@SessionAttribute int sessionId, Model model){
        //데이텁이스 삽입을 위해서 사용
        model.addAttribute("userId",sessionId);
        model.addAttribute("url",API_URL);
        return "payment";
    }

}
