package com.kosa5.hyunique.post.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.kosa5.hyunique.interceptor.annotation.Auth;
import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostingVO;
import com.kosa5.hyunique.post.vo.TagVO;

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
    // 게시글 작성
    @GetMapping
    public String requestPosting() {
    	
        return "posting";
    }

    @PostMapping
    @ResponseBody
    public String handlePostUpload(@RequestBody PostingVO posting) {
        postService.testUploadOnePost(posting.getPostVO(), posting.getPostProductVO());
//        String state = postService.uploadOnePost(posting.getPostVO(), posting.getPostProductVO());

        return "ok";
    }

    @GetMapping("/upload")
    @ResponseBody
    public String uploadFile() {
        List<String> object_keys = Arrays.asList("post/66118058-139b-43d9-88a3-0f75f316d48f.jpg",
                "post/685925ec-93e8-470f-a986-3855b2091d45.jpg");

        s3Service.deleteImgFile(object_keys);
        return "ok";
    }

    @PostMapping("/test")
    @ResponseBody
    public String testHandleTagUpload(@RequestBody PostingVO vo) {

        postService.testUploadOnePost(vo.getPostVO(), vo.getPostProductVO());
        return "ok";
    }
    
    @GetMapping("/tag")
    @ResponseBody
    public Map<String, List<TagVO>> getTagName() {

        Map<String, List<TagVO>> tagsMap = new HashMap<>();
        tagsMap.put("styleTags", postService.getTagInform("HY_STYLETAG"));
        tagsMap.put("tpoTags", postService.getTagInform("HY_TPOTAG"));
        tagsMap.put("seasonTags", postService.getTagInform("HY_SEASONTAG"));

        return tagsMap;
    }

}
