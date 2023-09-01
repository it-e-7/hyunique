package com.kosa5.hyunique.user.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVO {
    private int userId;
    private String userImg;
    private String userBackimg;
    private String userNickname;
    private String userSex;
    private int userHeight;
    private String userForm;
    private String userIntroduce;
    private String kakaoOauth;
    private String naverOauth;
    private String facebookUrl;
    private String twitterUrl;
    private String instagramUrl;
    private int followerCount;
    private String styleNames;
    private String userPrefer;
}