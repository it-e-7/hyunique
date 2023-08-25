package com.kosa5.hyunique.posting.controller;


import com.kosa5.hyunique.posting.vo.PostingVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/post")
public class PostingController {

    @GetMapping
    public String requestPosting() {
        return "posting";
    }

    @PostMapping
    public String handlePostUpload(@RequestBody PostingVO vo) {
        System.out.println("vo = " + vo);
        return null;
    }
}
