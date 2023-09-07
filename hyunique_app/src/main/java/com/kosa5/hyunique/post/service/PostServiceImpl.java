package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.util.S3Service;
import com.kosa5.hyunique.post.vo.PostProductVO;
import com.kosa5.hyunique.post.vo.FilterPostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PostDetailVO;
import com.kosa5.hyunique.post.vo.PageVO;
import com.kosa5.hyunique.post.vo.PostVO;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

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
            FilterPostVO followFilterPostVO = new FilterPostVO();
            //현재 인기있는 스타일을 넣어주면 됩니다. 백오피스가 없으니까... 일단 여기에다가 둘게요!
            //내가 팔로우 하고 있는 사람이 0인 경우
            followFilterPostVO.setTpo(Arrays.asList(21));
            System.out.println(followFilterPostVO);
            postVOList = postMapper.loadPopularPost(followFilterPostVO);
        }
        else{
            System.out.println(filterPostVO);
            postVOList = postMapper.loadFilterPost(filterPostVO);
        }
        return postVOList;
    }

    @Override
    public int uploadOnePost(PostVO postVO, List<PostProductVO> postProductVO) {
        List<URL> urls = s3Service.getUploadImgURL(postVO.getImgList());

        return 0;
    }

}
