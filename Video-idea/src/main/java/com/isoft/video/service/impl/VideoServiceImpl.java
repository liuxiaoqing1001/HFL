package com.isoft.video.service.impl;

import com.isoft.video.dao.VideoDao;
import com.isoft.video.dao.VideoMapper;
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
    public String getVideoPath(String uname, int id) {
        return videoDao.getVideoPath(uname,id);
    }

    @Autowired
    private VideoMapper videoMapper;

    @Override
    public Video getVideo(Integer id){
        return videoMapper.getVideo(id);
    }



}
