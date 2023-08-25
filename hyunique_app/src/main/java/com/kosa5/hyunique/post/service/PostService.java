package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.vo.PostVO;

import java.util.List;

public interface PostService {

    PostVO getOnePost (Integer post_id);
    List<PostVO> findTwelvePostList (Integer user_id);
    List<PostVO> loadMorePost (Integer page);

    List<PostVO> getfilterPostList (String gender, List<String> tpo, List<String> season, List<String> mood, Integer minHeight, Integer maxHeight);
}
