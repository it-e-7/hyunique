package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostingVO;
import com.kosa5.hyunique.post.vo.TagVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("post")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    S3Service s3Service;

    @GetMapping("{postId}")
    public String getPostDetailHandler(@PathVariable("postId") int postId, Model model) {

        PostDetailVO postDetailVO = postService.getPostDetailByPostIdUserId(postId, 22);

        model.addAttribute("postVO", postDetailVO);

        return "post/detail";
    }

    @PostMapping("like")
    @ResponseBody
    public int postLikePostHandler(int postId) {
        int userId = 22;
        return postService.postLikePost(postId, userId);
    }

    @PostMapping("unlike")
    @ResponseBody
    public int postUnlikePostHandler(int postId) {
        int userId = 22;
        return postService.postUnlikePost(postId, userId);
    }

    @GetMapping(value = "getPostList")
    public String getPostingListHandler(Model model) {
        return "postList";
    }

    // 게시글 작성
    @GetMapping
    public String requestPosting() {
        return "posting";
    }

    @PostMapping
    @ResponseBody
    public String handlePostUpload(@RequestBody PostingVO posting) {
        System.out.println("post controller test");
//        System.out.println("posting = " + posting);
        postService.testUploadOnePost(posting.getPostVO(), posting.getPostProductVO());
//        String state = postService.uploadOnePost(posting.getPostVO(), posting.getPostProductVO());
//        System.out.println("state = " + state);

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
        System.out.println("start post controller");
//        System.out.println("vo = " + vo);

        postService.testUploadOnePost(vo.getPostVO(), vo.getPostProductVO());
        return "ok";
    }

}
