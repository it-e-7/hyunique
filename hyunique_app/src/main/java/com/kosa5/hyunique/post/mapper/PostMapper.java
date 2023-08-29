package com.kosa5.hyunique.post.mapper;

import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostVO;

import java.util.List;

@Mapper
public interface PostMapper {

    PostDetailVO getPostDetailByPostIdUserId(@Param("postId") int postId, @Param("userId") int userId);

    int insertPostLike(@Param("postId") int postId, @Param("userId") int userId);

    int deletePostLike(@Param("postId") int postId, @Param("userId") int userId);

    List<PostVO> loadMorePost(@Param("page") Integer page, @Param("pageSize") Integer pageSize);

    List<PostVO> loadFilterPost(FilterPostVO filterPostVO);

    List<PostProductVO> selectSearchProductList(@Param("productName") String productName);
}
