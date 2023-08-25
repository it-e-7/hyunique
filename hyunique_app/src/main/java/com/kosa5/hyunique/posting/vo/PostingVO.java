package com.kosa5.hyunique.posting.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostingVO {
    private String postContent;
    private String tpoName;
    private String seasonName;
    private String styleName;
    private List<MultipartFile> imgUrl;
}
