package com.kosa5.hyunique.post.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PostDetailVO;

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
}
