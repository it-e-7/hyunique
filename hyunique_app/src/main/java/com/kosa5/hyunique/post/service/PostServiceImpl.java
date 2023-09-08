package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.*;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import oracle.sql.STRUCT;
import oracle.sql.StructDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;

import javax.swing.text.html.HTML;
import java.net.URL;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Struct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Filter;
import java.util.HashMap;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

    @Autowired
    S3Service s3Service;

    @Override
    public PostDetailVO getPostDetailByPostIdUserId(int postId, int userId) {
        return postMapper.getPostDetailByPostIdUserId(postId, userId);
    }

    @Override
    public int postLikePost(int postId, int userId) {
        return postMapper.insertPostLike(postId, userId);
    }

    @Override
    public int postUnlikePost(int postId, int userId) {
        return postMapper.deletePostLike(postId, userId);
    }

    @Override
    public List<PostVO> loadMorePost(Integer page) {
        List<PostVO> postVOList = new ArrayList<>();
        Integer pageSize = 10;
        PageVO pageVO = new PageVO();
        postVOList = postMapper.loadMorePost(page,pageSize);
        return postVOList;
    }

    @Override
    public List<PostVO> getfilterPostList(FilterPostVO filterPostVO) {
        List<PostVO> postVOList = new ArrayList<>();
        filterPostVO.setPage((filterPostVO.getPageSize())*(filterPostVO.getPage() - 1));
        if (filterPostVO.getSelectedType().equals("following")){
                //팔로워를 선택한 경우
            FilterPostVO followFilterPostVO = new FilterPostVO();
            followFilterPostVO.setTpo(Arrays.asList(21));
            followFilterPostVO.setUserId(filterPostVO.getUserId());
            followFilterPostVO.setPage(filterPostVO.getPage());
            if (filterPostVO.getUserId() == null){
                //로그인 하지 않은 경우, 인기있는 스타일을 보여준다.
                followFilterPostVO.setSelectedType("recommend");
                postVOList = postMapper.loadFilterPost(followFilterPostVO);
            }
            else {
                Integer followCount = postMapper.countFollower(followFilterPostVO);
                //로그인 한 경우, 팔로워의 포스트가 0개 인경우, 인기 있는 스타일을 보여준다.
                if (followCount == 0){
                    followFilterPostVO.setSelectedType("recommend");
                    postVOList = postMapper.loadFilterPost(followFilterPostVO);
                }
                //로그인 한 경우, 팔로워의 포스트가 1 이상인 경우
                else {
                    filterPostVO.setFollower(followCount);
                    postVOList = postMapper.loadFilterPost(filterPostVO);
                }
            }
        }
        else{
            postVOList = postMapper.loadFilterPost(filterPostVO);
        }
        return postVOList;
    }


    @Override
    public int countFollower(Integer userId){
        FilterPostVO followFilterPostVO = new FilterPostVO();
        followFilterPostVO.setUserId(userId);
        return postMapper.countFollower(followFilterPostVO);
    }

    @Override
    public String uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO) {

        System.out.println("service start");
        List<String> urls = s3Service.getUploadImgURL(postVO.getImgList());

        System.out.println("urls = " + urls);
        // urls의 값을 postVO의 imgList에 설정
        List<String> newImgList = new ArrayList<>();
        for (String url : urls) {
            newImgList.add(url);
        }
        postVO.setImgList(newImgList);  // imgList를 새로운 URL 문자열로 업데이트

        String state = "";

        Map<String, Object> post = new HashMap<>();
        post.put("posting", postVO);
        post.put("postProduct", postProductVO);
        post.put("postState", state);
//        postMapper.insertOnePost(post);

        return post.get("state").toString();
    }

    @Override
    public void testUploadOnePost(PostVO postVO, List<PostProductVO> postProductVO) {

        Map<String, Object> params = new HashMap<>();
        params.put("postProduct", postProductVO);
        params.put("post", postVO);
        params.put("imgUrl", postVO.getImgList());
        params.put("styleId", postVO.getStyleId());

        System.out.println("params = " + params);

        postMapper.testInsertOnePost(params);
    }

    @Override
    public List<TagVO> getTagInform(String type) {
        return postMapper.getTagInform(type);
    }

}
