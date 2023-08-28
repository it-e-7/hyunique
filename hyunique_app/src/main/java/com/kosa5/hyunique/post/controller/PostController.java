package com.kosa5.hyunique.post.controller;

import com.kosa5.hyunique.post.vo.PostProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostVO;


import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("post")
public class PostController {

    @Autowired
    PostService postService;

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

    @GetMapping(value = "getMorePost")
    public String loadMorePost(@RequestParam("page") int page, Model model) {
        List<PostVO> postVOList = new ArrayList<>();
        postVOList = postService.loadMorePost(page);
        model.addAttribute("postVOList", postVOList);
        return "ajax_response";
    }

    // 게시글 작성
    @GetMapping
    public String requestPosting() {
        return "posting";
    }

    @PostMapping
    public String handlePostUpload(PostVO vo) {
        System.out.println("vo = " + vo);
        return null;
    }

    @GetMapping("/search")
    public String requestSearch() {
        return "/search";
    }

    @GetMapping("/search/{productName}")
    @ResponseBody
    public List<PostProductVO> getSearchProduct(@PathVariable("productName") String productName) {
        System.out.println("productName = " + productName);
        List<PostProductVO> value = postService.getSearchProductList(productName);
        System.out.println("value = " + value);
        return postService.getSearchProductList(productName);
    }

}
