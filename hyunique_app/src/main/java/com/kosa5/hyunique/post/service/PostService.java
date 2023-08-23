package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.vo.PostDetailVO;

public interface PostService {

	PostDetailVO getPostDetailByPostIdUserId(int postId, int userId);
}
