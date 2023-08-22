package com.kosa5.hyunique.post.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostVO {

    private Integer postId;
    private Date postDate;
    private String postContent;
    private Integer tpoId;
    private Integer seasonId;
    private Integer userId;
    private String thumbnailUrl;

}
