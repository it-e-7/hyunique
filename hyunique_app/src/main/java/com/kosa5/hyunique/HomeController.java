package com.kosa5.hyunique;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.kosa5.hyunique.post.service.PostService;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
public class HomeController {
	
	@Autowired
	PostService postService;
	
	@GetMapping(value = "/")
    public String getPostingListHandler(@SessionAttribute("sessionId") Integer sessionId,Model model) {
        model.addAttribute("userId",sessionId);
        if(sessionId!=null){
            model.addAttribute("followerCount",postService.countFollower(sessionId));
        }
        return "postList";
    }
}
