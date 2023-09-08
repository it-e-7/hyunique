package com.kosa5.hyunique.post.vo;

import java.util.List;

import lombok.Data;

@Data
public class PostingVO {
    private PostVO postVO;
    private List<PostProductVO> postProductVO;
}
