package com.isoft.video.service;

import com.isoft.video.entity.Say;

import java.util.List;

public interface SayService {

    List<Say> getAll();

    List<Say> getSay(String uname);
    List<Say> getOtherSay(Integer id, String uname);


    Integer upDateCount(Integer id, Integer praise);

    Integer getPraiseCount(Integer id);


    List<Say> OtherSay(Integer[] idList, String uname);

    List<Say> getData(String uname, String name);

    List<Say> getOther(String uname1, String uname2);

    Integer publish(Say say);

    Integer upSay(String say, Integer id);

    Integer delById(Integer id);

    Say forward(Integer id);

    Say getAdata(Integer id);
}
