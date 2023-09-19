package com.kosa5.hyunique;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.kosa5.hyunique.post.service.PostService;

@Controller
public class HomeController {

    @Value("${api.url}")
    private String API_URL;

	@Autowired
	PostService postService;
	
	@GetMapping(value = "/")
    public String getPostingListHandler(HttpSession session,Model model) {
        model.addAttribute("userId",session.getAttribute("sessionId"));
        if(session.getAttribute("sessionId")!=null){
            model.addAttribute("followerCount",postService.countFollower(Integer.parseInt((String)session.getAttribute("sessionId"))));
            model.addAttribute("url",API_URL);
        }
        return "postList";
    }
}
