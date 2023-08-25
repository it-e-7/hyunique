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
    public List<PostVO> getfilterPostList(String gender, List<String> tpo, List<String> season, List<String> mood) {
        List<PostVO> postVOList = new ArrayList<>();
        List<Integer> tpoNumber = new ArrayList<>();
        List<Integer> seasonNumber = new ArrayList<>();
        List<Integer> moodNumber = new ArrayList<>();
        PageVO pageVO = new PageVO();
        //받아온 데이터 정리

        //성별
        if (gender.equals("MEN")||gender.equals("WOMEN")){
            //성별 그대로
        }
        else {
            gender="";
        }

        //tpo
        if (tpo != null) {
            if (tpo.contains("kosa")) {
                tpoNumber.add(21);
            }
            if (tpo.contains("travel")) {
                tpoNumber.add(22);
            }
            if (tpo.contains("campus")) {
                tpoNumber.add(23);
            }
            if (tpo.contains("cafe")) {
                tpoNumber.add(24);
            }
            if (tpo.contains("date")) {
                tpoNumber.add(25);
            }
            if (tpo.contains("merry")) {
                tpoNumber.add(26);
            }
            if (tpo.contains("office")) {
                tpoNumber.add(27);
            }
            if (tpo.contains("daily")) {
                tpoNumber.add(28);
            }
        }
            //season

        if(season != null) {
            if (season.contains("spring")) {
                seasonNumber.add(21);
            }
            if (season.contains("summer")) {
                seasonNumber.add(22);
            }
            if (season.contains("fall")) {
                seasonNumber.add(23);
            }
            if (season.contains("winter")) {
                seasonNumber.add(24);
            }
        }

        //mood
        if (mood != null) {
            if (mood.contains("minimal")) {
                moodNumber.add(21);
            }
            if (mood.contains("easy")) {
                moodNumber.add(22);
            }
            if (mood.contains("business")) {
                moodNumber.add(23);
            }
            if (mood.contains("amekaji")) {
                moodNumber.add(24);
            }
            if (mood.contains("street")) {
                moodNumber.add(25);
            }
            if (mood.contains("city")) {
                moodNumber.add(26);
            }
            if (mood.contains("onemile")) {
                moodNumber.add(27);
            }
            if (mood.contains("sporty")) {
                moodNumber.add(28);
            }
            if (mood.contains("unique")) {
                moodNumber.add(29);
            }
            if (mood.contains("retro")) {
                moodNumber.add(30);
            }
            if (mood.contains("lovely")) {
                moodNumber.add(31);
            }
            if (mood.contains("moderncasual")) {
                moodNumber.add(32);
            }
        }

        System.out.println("*gender check  -- "+gender);
        System.out.println("tpoNumber check  -- "+tpoNumber);
        System.out.println("seasonNumber check  -- "+seasonNumber);
        System.out.println("moodNumber check  -- "+moodNumber);
        System.out.println("mood check  -- "+mood);


        postVOList = postMapper.loadFilterPost(gender,tpoNumber,seasonNumber,moodNumber);
        return postVOList;
    }
}
