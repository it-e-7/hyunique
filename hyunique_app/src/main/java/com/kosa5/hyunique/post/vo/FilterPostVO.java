package com.kosa5.hyunique.post.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterPostVO {
    private List<String> gender;
    private List<Integer> tpo;
    private List<Integer> season;
    private List<Integer> style;
    private Integer minHeight;
    private Integer maxHeight;
    private Integer page;
    private Integer pageSize = 12;
    private String selectedType;
    private Integer userId;
    private Integer follower = 0;
}