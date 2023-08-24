package com.kosa5.hyunique.post.service;

import com.kosa5.hyunique.post.mapper.PostMapper;
import com.kosa5.hyunique.post.vo.PageVO;
import com.kosa5.hyunique.post.vo.PostVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{
    private final PostMapper postMapper;

    @Override
    public PostVO getOnePost(Integer post_id) {
        PostVO postVO = new PostVO();
        System.out.println("postVO check  -- before mapper "+postVO);
        postVO = postMapper.findOnePost(post_id);
        System.out.println("postVO check  -- after mapper "+postVO);
        return postVO;
    }

    @Override
    public List<PostVO> findTwelvePostList(Integer member_id) {
        List<PostVO> postVOList = new ArrayList<>();
        postVOList = postMapper.findTwelvePostList(member_id);
        return postVOList;
    }

    @Override
    public List<PostVO> loadMorePost(Integer page) {
        List<PostVO> postVOList = new ArrayList<>();
        PageVO pageVO = new PageVO();
        int startIndex = page*20+1;
        int endIndex = (page+1)*20;
        postVOList = postMapper.loadMorePost(startIndex, endIndex);
        System.out.println("postVOList check  -- "+postVOList);
        return postVOList;
    }

    @Override
    public List<PostVO> getfilterPostList(String gender, List<String> tpo) {
        List<PostVO> postVOList = new ArrayList<>();
        PageVO pageVO = new PageVO();
        System.out.println(tpo);
        Integer tpoNubmer;
        //받아온 데이터 정리

        //성별
        if (gender.equals("MAN")||gender.equals("WOMAN")){
            //성별 그대로
        }
        else {
            gender=null;
        }

        //tpo
        if (tpo.equals("kosa")){
            tpoNubmer = 21;
        }
        else if (tpo.equals("travel")){
            tpoNubmer = 22;
        }
        else if (tpo.equals("campus")){
            tpoNubmer = 23;
        }
        else if (tpo.equals("cafe")){
            tpoNubmer = 24;
        }
        else if (tpo.equals("date")){
            tpoNubmer = 25;
        }
        else if (tpo.equals("merry")){
            tpoNubmer = 26;
        }
        else if (tpo.equals("office")){
            tpoNubmer = 27;
        }
        else if (tpo.equals("daily")){
            tpoNubmer = 28;
        }
        else{
            tpoNubmer = null;
        }
        //postVOList = postMapper.loadMorePost(startIndex, endIndex);
        System.out.println("postVOList check  -- "+postVOList);
        return postVOList;
    }
}
