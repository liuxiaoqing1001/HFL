package com.isoft.video.service.impl;

import com.isoft.video.dao.VideoDao;
import com.isoft.video.entity.Video;
import com.isoft.video.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    VideoDao videoDao;

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

}
