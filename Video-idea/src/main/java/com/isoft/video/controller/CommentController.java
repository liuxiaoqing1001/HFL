package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/getAllByVid/{vid}")
    public ResponseData getAllByVid(@PathVariable("vid") Integer vid) {
        return new ResponseData(
                0,
                "请求成功",
                commentService.getAllByVid(vid)
        );
    }
}
