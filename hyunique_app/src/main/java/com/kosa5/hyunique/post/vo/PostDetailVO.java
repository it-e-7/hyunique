package com.kosa5.hyunique.post.vo;

import java.util.List;

import lombok.Data;

@Data
public class PostDetailVO {

	private int postId;
	private int userId;
	private String userImg;
	private String userNickname;
	private String userForm;
	private int userHeight;
	private int follow;
	private List<String> imgList;
	private int styleLike;
	private int likeCount;
	private String postDate;
	private String postContent;
	private List<PostProductVO> productList;
	private List<String> styleTagList;
	private String seasonName;
	private String tpoName;
	private List<PostThumbnailVO> postThumbnailList;
}
