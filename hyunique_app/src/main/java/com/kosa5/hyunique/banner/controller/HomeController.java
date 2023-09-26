package com.kosa5.hyunique.banner.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.banner.service.BannerService;
import com.kosa5.hyunique.banner.vo.BannerVO;
import com.kosa5.hyunique.post.service.PostService;

import lombok.extern.java.Log;

@Log
@Controller
public class HomeController {

    @Value("${api.url}")
    private String API_URL;

	@Autowired
	PostService postService;

    @Autowired
    private BannerService bannerService;

	@GetMapping(value = "/")
    public String getPostingListHandler(HttpSession session,Model model) {
        model.addAttribute("userId",session.getAttribute("sessionId"));
        if(session.getAttribute("sessionId")!=null){
            model.addAttribute("followerCount",postService.countFollower(Integer.parseInt((String)session.getAttribute("sessionId"))));
            model.addAttribute("url",API_URL);
        }
        return "postList";
    }
	
	@ResponseBody
    @GetMapping("/banners")
    public List<BannerVO> getAllBanners() {
        return bannerService.getAllBanners();
    }
    
}
