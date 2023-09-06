package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.vo.*;

import java.util.List;
import java.util.Map;

public interface PostService {

    PostDetailVO getPostDetailByPostIdUserId(int postId, int userId);

    int postLikePost(int postId, int userId);

    int postUnlikePost(int postId, int userId);

    List<PostVO> loadMorePost(Integer page);

    List<PostVO> getfilterPostList (FilterPostVO filterPostVO);

    String uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO);

    void testUploadOnePost(PostVO postVO, List<PostProductVO> postProductVO);

    List<TagVO> getTagInform(String type);
}
