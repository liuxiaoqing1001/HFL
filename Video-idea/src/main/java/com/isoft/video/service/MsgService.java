package com.isoft.video.service;

import com.isoft.video.entity.Msg;
import com.isoft.video.entity.User;
import com.isoft.video.entity.VideoType;

import java.util.List;

public interface MsgService {
    public static final int REG_MSG_OK = 0 ;
    public static final int REG_MSG_FAIL_INFO_NON = 1 ;
    public static final int REG_MSG_FAIL_OTHER = 2 ;

    List<Msg> getAll(String receiver);
    Integer addMsg(Msg msg) ;
}
