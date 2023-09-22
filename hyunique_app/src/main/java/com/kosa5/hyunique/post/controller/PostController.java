package com.kosa5.hyunique.post.controller;

import java.io.File;
import java.io.IOException;
import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostingVO;
import com.kosa5.hyunique.post.vo.TagVO;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("post")
public class PostController {

    Logger log = LogManager.getLogger("case3");

    @Autowired
    PostService postService;

    @Autowired
    S3Service s3Service;

    @GetMapping("{postId}")
    public String getPostDetailHandler(@SessionAttribute(value="sessionId", required=false) Integer sessionId, @PathVariable("postId") int postId, Model model) {
    	
    	if(sessionId == null) {
    		sessionId = -1;
    	}

        PostDetailVO postDetailVO = postService.getPostDetailByPostIdUserId(postId, sessionId);

        model.addAttribute("postVO", postDetailVO);

        return "post/detail";
    }
    
    @Auth
    @PostMapping("like")
    @ResponseBody
    public int postLikePostHandler(@SessionAttribute int sessionId, int postId) {
        return postService.postLikePost(postId, sessionId);
    }
    
    @Auth
    @PostMapping("unlike")
    @ResponseBody
    public int postUnlikePostHandler(@SessionAttribute int sessionId, int postId) {
        return postService.postUnlikePost(postId, sessionId);
    }

    @GetMapping(value = "getQRPage")
    public String getQRPage(Model model){
        return "readQRPage";
    }

    // 게시글 작성 페이지
    @GetMapping
    public String requestPosting() {
        return "posting";
    }

    @Auth
    @PostMapping
    @ResponseBody
    public String handlePostUpload(@RequestParam("files") MultipartFile[] files,
                                   @RequestParam("postingVO") String postingVOJson,
                                   @SessionAttribute int sessionId) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        PostingVO posting = objectMapper.readValue(postingVOJson, PostingVO.class);
        posting.getPostVO().setImgFiles(files);
        posting.getPostVO().setUserId(sessionId);
        String state = postService.uploadOnePost(posting.getPostVO(), posting.getPostProductVO());
        log.info("upload {}", state);

        return state;
    }
    
    @GetMapping("/tag")
    @ResponseBody
    public List<TagVO> getTagInfo() {
        return postService.getTagInform();
    }

    @DeleteMapping("/{postId}")
    @ResponseBody
    public String handlePostDelete(@PathVariable("postId") int postId) {
        log.info("delete");
        String state = postService.deleteOnePost(postId);
        return state;
    }
}
