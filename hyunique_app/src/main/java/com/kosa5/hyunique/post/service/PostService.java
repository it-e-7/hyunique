package com.kosa5.hyunique.post.service;

import java.util.List;

import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostVO;
import com.kosa5.hyunique.post.vo.TagVO;

public interface PostService {

    PostDetailVO getPostDetailByPostIdUserId(int postId, int userId);

    int postLikePost(int postId, int userId);

    int postUnlikePost(int postId, int userId);

    List<PostVO> loadMorePost(Integer page);

    List<PostVO> getfilterPostList (FilterPostVO filterPostVO);

    int countFollower(Integer userId);

    String uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO);

    void testUploadOnePost(PostVO postVO, List<PostProductVO> postProductVO);

    List<TagVO> getTagInform(String type);

}
