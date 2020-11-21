package com.isoft.video.service;

import com.isoft.video.entity.Comment;

import java.util.List;

public interface CommentService {
    public static final int REG_MSG_OK = 0 ;
    public static final int REG_MSG_FAIL_INFO_NON = 1 ;
    public static final int REG_MSG_FAIL_OTHER = 2 ;

    List<Comment> getAllByVid(Integer vid);

    int getSumByVId(Integer vid);

    Integer addComment(Comment comment);
}
