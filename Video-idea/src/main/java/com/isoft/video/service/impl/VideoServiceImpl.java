package com.isoft.video.service.impl;

import com.isoft.video.bean.Page;
import com.isoft.video.dao.VideoDao;
import com.isoft.video.dao.VideoTypeDao;
import com.isoft.video.entity.Video;
import com.isoft.video.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    VideoDao videoDao;

    @Autowired
    VideoTypeDao videoTypeDao;

    @Override
    public List<Video> getAll() {
        return videoDao.getAll();
    }

    @Override
    public String getVideoPath(int id) {
        return videoDao.getVideoPath(id);
    }

    @Override
    public boolean delById(Integer id) {
        if(null == id || id < 1) {
            return false ;
        }
        return videoDao.delById(id) > 0;
    }

    @Override
    public boolean delByIds(List<Integer> ids) {
        if(null == ids || ids.size() < 1) {
            return false;
        }
        return videoDao.delMoreByIds(ids)>0;
    }

    /**
     *
     * @param typeid
     * @param title
     * @param pubdate
     * @param curPage
     * @param size
     * @return
     */
    @Override
    public Page<Video> videoPage(Integer typeid, String title, Date pubdate, Integer curPage, Integer size) {
        if(null == curPage || curPage < 1) {
            curPage = 1 ;
        }
        if(null == size || size < 1) {
            size = 10 ;
        }
        String pubdateStr = null ;
        if(null != pubdate) {
            pubdateStr = new SimpleDateFormat("yyyyMMdd").format(pubdate) ;
        }
        List<Video> list = videoDao.getMoreBy(typeid , title , pubdateStr , size * (curPage-1) , size) ;
        int count = videoDao.getMoreCount(typeid , title , pubdateStr) ;
        int pageCount = (int) Math.ceil(count * 1.0 / size);
        Page<Video> pageInfo = new Page() ;
        pageInfo.setData((ArrayList<Video>) list);
        pageInfo.setCurPage(curPage);
        pageInfo.setPageCount(pageCount);
        pageInfo.setRowCount(count) ;
        pageInfo.setSize(size);
        return pageInfo ;
    }

    @Override
    public boolean updateStatus(Integer id) {
        if(null == id || id < 1) {
            return false ;
        }
        return videoDao.updateStatus(id)>0;
    }

    @Override
    public List<Video> getVideoByType(String typename) {
        if(typename==null) {
            return null ;
        }
        Integer id = videoTypeDao.getIdByName(typename);
        return videoDao.getVideoByType(id);
    }

}
