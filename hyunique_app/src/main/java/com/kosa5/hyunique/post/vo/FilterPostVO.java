package com.kosa5.hyunique.post.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterPostVO {
    private String gender;
    private List<Integer> tpo;
    private List<Integer> season;
    private List<Integer> mood;
    private Integer minHeight;
    private Integer maxHeight;
    private Integer page;
    private Integer pageSize = 10;
}