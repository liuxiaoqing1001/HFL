package com.isoft.video.service;

import com.isoft.video.entity.Say;

import java.util.List;

public interface SayService {

    public static final int REG_MSG_OK = 0 ;
    public static final int REG_MSG_FAIL_INFO_NON = 1 ;
    public static final int REG_MSG_FAIL_OTHER = 2 ;

    List<Say> getAll();

    List<Say> getSay(String uname);
    List<Say> getOtherSay(Integer id, String uname);


    Integer upPraiseCount(Integer vid, Integer praise);

    Integer getPraiseCount(Integer id);

    Integer upCollectCount(Integer vid, Integer collect);

    Integer getCollectCount(Integer id);

    List<Say> OtherSay(Integer[] idList, String uname);

    List<Say> getData(String uname, String name);

    List<Say> getOther(String uname1, String uname2);

    Integer publish(Say say);

    Integer upSay(String say, Integer id);

    Integer delById(Integer id);

    Say forward(Integer id);

    Say getPAndC(Integer vid);

    Integer addSay(Say say);
}
