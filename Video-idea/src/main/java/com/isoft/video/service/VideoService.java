package com.isoft.video.service;

import com.isoft.video.bean.Page;
import com.isoft.video.entity.User;
import com.isoft.video.entity.Video;

import java.util.Date;
import java.util.List;

public interface VideoService {
    public static final int REG_MSG_OK = 0 ;
    public static final int REG_MSG_FAIL_NAMEEXISTS = 1 ;
    public static final int REG_MSG_FAIL_INFO_NON = 2 ;
    public static final int REG_MSG_FAIL_OTHER = 3 ;

    String KEY_USER = "Video" ;
    String KEY_MSG = "Msg" ;
    String KEY_Status = "Status" ;
    int LOGIN_MSG_OK = 0 ;
    int LOGIN_MSG_FAIL_NON = 1 ;
    int LOGIN_MSG_FAIL_ERROR = 2 ;
    int LOGIN_MSG_FAIL_OTHER = 3 ;
    int ROLE_NoCheck = 0 ;
    int ROLE_Check = 1 ;

    List<Video> getAll() ;

    String getVideoPath(int id );

    boolean delById(Integer id);

    boolean delByIds(List<Integer> ids);

    Page<Video> videoPage(Integer typeid, String title, Date pubdate, Integer curPage, Integer size);

    boolean updateStatus(Integer id);

    List<Video> getVideoByType(String typename);

}
