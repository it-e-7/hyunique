package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;

import javax.swing.text.html.HTML;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

    @Autowired
    S3Service s3Service;

    @Override
    public PostDetailVO getPostDetailByPostIdUserId(int postId, int userId) {
        return postMapper.getPostDetailByPostIdUserId(postId, userId);
    }

    @Override
    public int postLikePost(int postId, int userId) {
        return postMapper.insertPostLike(postId, userId);
    }

    @Override
    public int postUnlikePost(int postId, int userId) {
        return postMapper.deletePostLike(postId, userId);
    }

    @Override
    public List<PostVO> loadMorePost(Integer page) {
        List<PostVO> postVOList = new ArrayList<>();
        Integer pageSize = 10;
        PageVO pageVO = new PageVO();
        postVOList = postMapper.loadMorePost(page,pageSize);
        return postVOList;
    }

    @Override
    public List<PostVO> getfilterPostList(FilterPostVO filterPostVO) {
        List<PostVO> postVOList = new ArrayList<>();
        System.out.println("Before : "+filterPostVO);
        filterPostVO.setPage((filterPostVO.getPageSize())*(filterPostVO.getPage() - 1));
        postVOList = postMapper.loadFilterPost(filterPostVO);
        System.out.println("After : "+postVOList);
        return postVOList;
    }

    @Override
    public String uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO) {
        List<String> urls = s3Service.getUploadImgURL(postVO.getImgList());

        System.out.println("urls = " + urls);
        // urls의 값을 postVO의 imgList에 설정
        List<String> newImgList = new ArrayList<>();
        for (String url : urls) {
            newImgList.add(url);
        }
        postVO.setImgList(newImgList);  // imgList를 새로운 URL 문자열로 업데이트

        String state = "";

        Map<String, Object> post = new HashMap<>();
        post.put("posting", postVO);
        post.put("postProduct", postProductVO);
        post.put("postState", state);
//        postMapper.insertOnePost(post);

        return post.get("state").toString();
    }

    @Override
    public void testUploadOnePost(PostVO postVO, List<PostProductVO> postProductVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("postProduct", postProductVO);
        params.put("post", postVO);

        postMapper.testInsertOnePost(params);
    }

    @Override
    public List<TagVO> getTagInform(String type) {
        return postMapper.getTagInform(type);
    }

}
