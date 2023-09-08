package com.kosa5.hyunique.post.api;

import com.kosa5.hyunique.post.service.PostService;
import com.kosa5.hyunique.post.vo.TagVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("post")
public class PostRestController {

    @Autowired
    PostService postService;

    @GetMapping("/tag")
    public Map<String, List<TagVO>> getTagName() {

        Map<String, List<TagVO>> tagsMap = new HashMap<>();
        tagsMap.put("styleTags", postService.getTagInform("HY_STYLETAG"));
        tagsMap.put("tpoTags", postService.getTagInform("HY_TPOTAG"));
        tagsMap.put("seasonTags", postService.getTagInform("HY_SEASONTAG"));

        return tagsMap;
    }
}
