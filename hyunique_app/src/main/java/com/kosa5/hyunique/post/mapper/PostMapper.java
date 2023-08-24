package com.kosa5.hyunique.post.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kosa5.hyunique.post.vo.PostDetailVO;

@Mapper
public interface PostMapper {

	PostDetailVO getPostDetailByPostIdUserId(@Param("postId") int postId, @Param("userId") int userId);
	int insertPostLike(@Param("postId") int postId, @Param("userId") int userId);
	int deletePostLike(@Param("postId") int postId, @Param("userId") int userId);
}
