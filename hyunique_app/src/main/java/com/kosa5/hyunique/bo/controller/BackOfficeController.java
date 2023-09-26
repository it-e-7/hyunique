package com.kosa5.hyunique.bo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kosa5.hyunique.bo.service.BackOfficeService;

@Controller
@RequestMapping("backoffice")
public class BackOfficeController {

	@Autowired
	BackOfficeService boService;
	
	//@Auth(role = Role.ADMIN)
	@GetMapping
	public String getBackOfficeHome() {
		
		
		return "backoffice/home";
	}
	
}
