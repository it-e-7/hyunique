package com.kosa5.hyunique.user.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostVO {
	private int postId;
	private Date postDate;
	private String postContent;
	private int tpoId;
	private int seasonId;
	private int userId;
	private String thumbnailUrl;
}
