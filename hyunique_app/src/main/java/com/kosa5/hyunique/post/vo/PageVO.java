package com.kosa5.hyunique.post.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageVO {
    private Integer firstIndex;
    private Integer endIndex;
}