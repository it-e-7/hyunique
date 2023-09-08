package com.kosa5.hyunique.post.mapper;

import com.kosa5.hyunique.post.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostMapper {

    PostDetailVO getPostDetailByPostIdUserId(@Param("postId") int postId, @Param("userId") int userId);

    int insertPostLike(@Param("postId") int postId, @Param("userId") int userId);

    int deletePostLike(@Param("postId") int postId, @Param("userId") int userId);

    List<PostVO> loadMorePost(@Param("page") Integer page, @Param("pageSize") Integer pageSize);

    List<PostVO> loadFilterPost(FilterPostVO filterPostVO);

//    int insertOnePost(Map<String, Object> post);

    void testInsertOnePost(Map<String, Object> params);

    List<TagVO> getTagInform(String type);

}
