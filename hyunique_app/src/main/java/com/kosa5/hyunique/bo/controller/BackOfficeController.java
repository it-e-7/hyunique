package com.kosa5.hyunique.bo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.kosa5.hyunique.bo.service.BackOfficeService;
import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.interceptor.annotation.Auth.Role;
import com.kosa5.hyunique.product.vo.ProductDetailVO;

@Controller
@RequestMapping("backoffice")
@SessionAttributes(value = { "adminLog" })
public class BackOfficeController {

	@Autowired
	BackOfficeService boService;
	
	@Auth(role = Role.ADMIN)
	@GetMapping
	public String getBackOfficeHome() {
		return "backoffice/home";
	}
	
	@Auth(role = Role.ADMIN)
	@GetMapping("qr")
	public String getBackOfficeQR() {
		return "backoffice/qr";
	}
	
	@Auth(role = Role.ADMIN)
	@PostMapping("qr")
	@ResponseBody
	public List<ProductDetailVO> getQRCount(int filter) {
		List<ProductDetailVO> result = boService.getQRCount(filter);
		return result;
	}
	
	@Auth(role = Role.ADMIN)
	@GetMapping("product")
	public String getBackOfficeProduct() {
		return "backoffice/product";
	}
	
	@Auth(role = Role.ADMIN)
	@GetMapping("brand")
	public String getBackOfficeBrand() {
		return "backoffice/brand";
	}
	
	@Auth(role = Role.ADMIN)
	@GetMapping("banner")
	public String getBackOfficeBanner() {
		return "backoffice/banner";
	}
	
	@GetMapping("login")
	public String getBackOfficeLogin() {
		return "backoffice/login";
	}
	
	@PostMapping("login")
	@ResponseBody
	public String postBackOfficeLogin(String adminId, String adminPw, Model model) {
		int isValidate = boService.adminLogin(adminId, adminPw);
		
		if(isValidate > 0) {
			model.addAttribute("adminLog", "true");
			return "{\"redirect\":\"/backoffice\", \"msg\":\"로그인 성공\"}";
		} else {
			return "{\"redirect\":\"/backoffice/login\", \"msg\":\"로그인 실패\"}";
		}
	}
	
	@Auth(role = Role.ADMIN)
	@PostMapping("logout")
	@ResponseBody
	public String postBackOfficeLogout(SessionStatus sessionStatus) {
		sessionStatus.setComplete();
		
		return "{\"redirect\":\"/backoffice/login\", \"msg\":\"로그아웃 성공\"}";
	}
}
