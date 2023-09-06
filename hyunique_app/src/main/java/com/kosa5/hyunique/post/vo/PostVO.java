package com.kosa5.hyunique.post.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
public class PostVO {

    private Integer postId;
    private Date postDate;
    private String postContent;
    private Integer tpoId;
    private Integer seasonId;
    private List<Integer> styleId;
    private Integer userId;
    private String thumbnailUrl;
    private List<String> imgList;
}