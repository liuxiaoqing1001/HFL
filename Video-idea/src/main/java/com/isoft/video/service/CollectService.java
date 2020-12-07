package com.isoft.video.service;

import com.isoft.video.entity.Collect;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CollectService {
    int COLLECT_MSG_OK = 0 ;    //收藏成功
    int COLLECT_MSG_FAIL_NAMEEXISTS = 1 ;   //已经收藏过
    int COLLECT_MSG_FAIL_INFO_NON = 2 ; //收藏信息不完整
    int COLLECT_MSG_FAIL_OTHER = 3 ;    //收藏失败的其他原因
    /**
     * 获取所有登录者的收藏视频
     * @return
     */
    List<Collect> getAllByUname(String uname) ;

    /**
     * 根据用户名查询收藏记录
     * @param uname
     * @param vid
     * @return
     */
    int getByUname(@Param("uname") String uname, @Param("vid") int vid) ;

    /**
     * 添加收藏视频
     * @param collect
     * @return
     */
    Integer addCollect(Collect collect) ;

    /**
     * 删除收藏视频
     * @param vid
     * @param uname
     * @return
     */
    Integer deleteCollect(int vid, String uname) ;

    Integer getCCount(Integer vid);
}
