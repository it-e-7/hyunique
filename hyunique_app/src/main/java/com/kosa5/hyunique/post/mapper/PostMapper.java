package com.kosa5.hyunique.post.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostVO;
import com.kosa5.hyunique.post.vo.TagVO;

@Mapper
public interface PostMapper {

    PostDetailVO getPostDetailByPostIdUserId(@Param("postId") int postId, @Param("userId") int userId);

    int insertPostLike(@Param("postId") int postId, @Param("userId") int userId);

    int deletePostLike(@Param("postId") int postId, @Param("userId") int userId);

    List<PostVO> loadMorePost(@Param("page") Integer page, @Param("pageSize") Integer pageSize);

    List<PostVO> loadFilterPost(FilterPostVO filterPostVO);

    Integer countFollower(FilterPostVO filterPostVO);
  
    void insertOnePost(Map<String, Object> params);

    List<TagVO> getTagInform(String type);

}
