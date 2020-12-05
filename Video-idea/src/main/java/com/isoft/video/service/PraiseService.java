package com.isoft.video.service;

import com.isoft.video.entity.Praise;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PraiseService {
    int PRAISE_MSG_OK = 0 ;    //点赞成功
    int PRAISE_MSG_FAIL_NAMEEXISTS = 1 ;   //已经点赞过
    int PRAISE_MSG_FAIL_INFO_NON = 2 ; //点赞信息不完整
    int PRAISE_MSG_FAIL_OTHER = 3 ;    //点赞失败的其他原因
    /**
     * 获取所有登录者的点赞视频
     * @return
     */
    List<Praise> getAllByUname(String uname) ;

    /**
     * 根据用户名查询点赞记录
     * @param uname
     * @param vid
     * @return
     */
    int getByUname(@Param("uname") String uname, @Param("vid") int vid) ;

    /**
     * 添加点赞视频
     * @param praise
     * @return
     */
    Integer addPraise(Praise praise) ;

    /**
     * 删除点赞视频
     * @param vid
     * @param uname
     * @return
     */
    Integer deletePraise(int vid, String uname) ;
}
