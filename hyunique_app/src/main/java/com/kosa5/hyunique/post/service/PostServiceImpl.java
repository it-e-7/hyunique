package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PageVO;
import com.kosa5.hyunique.post.vo.PostVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{
    private final PostMapper postMapper;

    @Override
    public PostVO getOnePost(Integer post_id) {
        PostVO postVO = new PostVO();
        System.out.println("postVO check  -- before mapper "+postVO);
        postVO = postMapper.findOnePost(post_id);
        System.out.println("postVO check  -- after mapper "+postVO);
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
        int startIndex = page*20+1;
        int endIndex = (page+1)*20;
        postVOList = postMapper.loadMorePost(startIndex, endIndex);
        System.out.println("postVOList check  -- "+postVOList);
        return postVOList;
    }
}
