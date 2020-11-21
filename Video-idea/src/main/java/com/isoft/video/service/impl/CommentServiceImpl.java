package com.isoft.video.service.impl;

import com.isoft.video.dao.CommentDao;
import com.isoft.video.entity.Comment;
import com.isoft.video.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao commentDao;

    @Override
    public List<Comment> getAllByVid(Integer vid) {
        return commentDao.getAllByVid(vid);
    }

    @Override
    public int getSumByVId(Integer vid) {
        return commentDao.getSumByVId(vid);
    }

    @Override
    public Integer addComment(Comment comment) {
        System.out.println(comment.toString());
        if(null == comment) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(comment.getVid()) || StringUtils.isEmpty(comment.getComment()) ||
                StringUtils.isEmpty(comment.getSender()) || StringUtils.isEmpty(comment.getReceiver()) ||
                StringUtils.isEmpty(comment.getTime())) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        int r = commentDao.add(comment) ;
        if(r > 0) {
            return REG_MSG_OK ;
        } else {
            return REG_MSG_FAIL_OTHER ;
        }
    }
}
