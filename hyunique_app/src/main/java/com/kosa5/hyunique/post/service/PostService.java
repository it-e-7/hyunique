package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostVO;

import java.util.List;

public interface PostService {

    PostDetailVO getPostDetailByPostIdUserId(int postId, int userId);

    int postLikePost(int postId, int userId);

    int postUnlikePost(int postId, int userId);

    PostVO getOnePost (Integer postId);

    List<PostVO> findTwelvePostList (Integer userId);

    List<PostVO> loadMorePost(Integer page);

    List<PostVO> getfilterPostList (FilterPostVO filterPostVO);

    int uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO);
}
