package com.isoft.video.service.impl;

import com.isoft.video.dao.CommentDao;
import com.isoft.video.entity.Comment;
import com.isoft.video.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao commentDao;

    @Override
    public List<Comment> getAllByVid(Integer vid) {
        return commentDao.getAllByVid(vid);
    }
}
