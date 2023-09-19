package com.kosa5.hyunique.post.vo;

import java.util.Date;
import java.util.List;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
    private MultipartFile[] imgFiles;
}