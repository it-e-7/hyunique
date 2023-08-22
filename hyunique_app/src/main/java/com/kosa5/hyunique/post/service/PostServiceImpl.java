package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PostVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
