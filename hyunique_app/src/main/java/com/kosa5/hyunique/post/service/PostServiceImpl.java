package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PageVO;
import com.kosa5.hyunique.post.vo.PostVO;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

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
    public PostVO getOnePost(Integer post_id) {
        PostVO postVO = new PostVO();
        System.out.println("postVO check  -- before mapper " + postVO);
        postVO = postMapper.findOnePost(post_id);
        System.out.println("postVO check  -- after mapper " + postVO);
        return postVO;
    }

    @Override
    public List<PostVO> findTwelvePostList(Integer member_id) {
        List<PostVO> postVOList = new ArrayList<>();
        postVOList = postMapper.findTwelvePostList(member_id);
        return postVOList;
    }

    @Override
    public List<PostVO> loadMorePost(Integer page) {
        List<PostVO> postVOList = new ArrayList<>();
        PageVO pageVO = new PageVO();
        int startIndex = page * 20 + 1;
        int endIndex = (page + 1) * 20;
        postVOList = postMapper.loadMorePost(startIndex, endIndex);
        return postVOList;
    }

    @Override
    public List<PostVO> getfilterPostList(FilterPostVO filterPostVO) {

        List<PostVO> postVOList = new ArrayList<>();

        System.out.println("RESULT START --- " + filterPostVO);
        postVOList = postMapper.loadFilterPost(filterPostVO);
        System.out.println("RESULT END --- " + postVOList);
        return postVOList;
    }

}
