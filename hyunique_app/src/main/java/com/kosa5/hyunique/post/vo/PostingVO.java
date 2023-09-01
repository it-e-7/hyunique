package com.kosa5.hyunique.post.vo;

import lombok.Data;

import java.util.List;

@Data
public class PostingVO {
    private PostVO postVO;
    private List<PostProductVO> postProductVO;
}
