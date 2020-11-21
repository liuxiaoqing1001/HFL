package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Comment;
import com.isoft.video.service.CommentService;
import com.isoft.video.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

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

    @GetMapping("/getSumByVId/{vid}")
    public ResponseData getSumByVId(@PathVariable("vid") Integer vid) {
        return new ResponseData(
                0,
                "请求成功",
                commentService.getSumByVId(vid)
        );
    }

    @PostMapping("/addComment")
    public ResponseData addComment(@RequestBody Map<Object , Object> map) {
        Comment comment = new Comment() ;
        comment.setVid((Integer) map.get("vid"));
        comment.setComment((String)map.get("comment"));
        comment.setSender((String)map.get("sender"));
        comment.setReceiver((String)map.get("receiver"));
        comment.setTime(new Date());
        Integer result = commentService.addComment(comment) ;
        String str = "" ;
        switch (result) {
            case MsgService.REG_MSG_OK :
                str = "发送评论成功" ;
                break;
            case MsgService.REG_MSG_FAIL_INFO_NON:
                str = "信息不完整" ;
                break;
            default :
                str = "发送失败" ;
                break;
        }
        return new ResponseData(
                result ,
                str,
                result == 0
        ) ;
    }
}
