package com.kosa5.hyunique.post.mapper;

import com.kosa5.hyunique.post.vo.PostVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    PostVO findOnePost(Integer postId);
    List<PostVO> findTwelvePostList(Integer memberId);
    List<PostVO> loadMorePost(@Param("startIndex") Integer startIndex, @Param("endIndex")Integer endIndex);
    List<PostVO> loadFilterPost(@Param("gender") String gender, @Param("tpoNumber") List<Integer> tpoNumber,
                                @Param("seasonNumber") List<Integer> seasonNumber, @Param("moodNumber") List<Integer> moodNumber,
                                @Param("minHeight") Integer minHeight, @Param("moodNumber") Integer maxHeight);
}
