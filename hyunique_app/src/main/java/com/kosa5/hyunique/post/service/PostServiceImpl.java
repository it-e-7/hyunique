package com.kosa5.hyunique.post.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import com.kosa5.hyunique.post.vo.PageVO;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.PostVO;
import com.kosa5.hyunique.post.vo.TagVO;

@Service
public class PostServiceImpl implements PostService {

    Logger log = LogManager.getLogger("case3");

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

        List<String> urls = s3Service.getUploadImgFileURL(postVO.getImgFiles());
        postVO.setThumbnailUrl(urls.get(0));

        Map<String, Object> params = new HashMap<>();
        params.put("postProduct", postProductVO);
        params.put("post", postVO);
        params.put("imgUrl", urls);
        params.put("styleId", postVO.getStyleId());
        params.put("state", null);
        postMapper.insertOnePost(params);

        return params.get("state").toString();
    }

    @Override
    public List<TagVO> getTagInform() {
        // TagVO(type, tagId, tagName) 형태
        return postMapper.getTagInform();
    }

}
