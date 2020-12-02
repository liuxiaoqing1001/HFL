package com.isoft.video.service.impl;

import com.isoft.video.bean.Page;
import com.isoft.video.dao.VideoTypeDao;
import com.isoft.video.entity.VideoType;
import com.isoft.video.service.VideoTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VideoTypeServiceImpl implements VideoTypeService {

    @Autowired
    VideoTypeDao videoTypeDao;

    @Override
    public List<VideoType> getAll() {
        return videoTypeDao.getAll();
    }

    @Override
    public Page<VideoType> videoTypePage(Integer curPage, Integer size) {
        if(null == curPage || curPage < 1) {
            curPage = 1 ;
        }
        if(null == size || size < 1) {
            size = 10 ;
        }
        String pubdateStr = null ;
        List<VideoType> list = videoTypeDao.getMoreLimit(size * (curPage-1) , size) ;
        int count = videoTypeDao.getCount() ;
        int pageCount = (int) Math.ceil(count * 1.0 / size);
        Page<VideoType> pageInfo = new Page() ;
        pageInfo.setData((ArrayList<VideoType>) list);
        pageInfo.setCurPage(curPage);
        pageInfo.setPageCount(pageCount);
        pageInfo.setRowCount(count) ;
        pageInfo.setSize(size);
        return pageInfo ;
    }

    @Override
    public boolean add(String typename) {
        return videoTypeDao.add(typename)>0;
    }

    @Override
    public boolean delById(Integer id) {
        if(null == id || id < 1) {
            return false ;
        }
        return videoTypeDao.delById(id) > 0;
    }

    @Override
    public boolean updateById(String typename, Integer id) {
        if(id == null || id< 1) {
            return false ;
        }
        if(typename==null||typename==""){
            return false;

        }
        return videoTypeDao.update(typename,id) > 0;
    }

    @Override
    public boolean nameCount(String typename) {
        return videoTypeDao.nameCount(typename)>0;
    }
}
