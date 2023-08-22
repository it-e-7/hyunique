package com.kosa5.hyunique.post.mapper;

import com.kosa5.hyunique.post.vo.PostVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {

    PostVO findOnePost(Integer postId);

}
