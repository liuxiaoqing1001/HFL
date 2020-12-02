package com.isoft.video.service;

import com.isoft.video.bean.Page;
import com.isoft.video.entity.VideoType;

import java.util.List;

public interface VideoTypeService {
    List<VideoType> getAll();

    Page<VideoType> videoTypePage(Integer curPage , Integer size) ;
//    List<VideoType> getVideotypeAll();
    boolean add(String typename) ;
    boolean delById(Integer id) ;
    boolean updateById(String typename,Integer id) ;

    boolean nameCount(String typename);
}
