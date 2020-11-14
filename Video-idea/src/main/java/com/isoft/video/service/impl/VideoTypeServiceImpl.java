package com.isoft.video.service.impl;

import com.isoft.video.dao.VideoTypeDao;
import com.isoft.video.entity.VideoType;
import com.isoft.video.service.VideoTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoTypeServiceImpl implements VideoTypeService {

    @Autowired
    VideoTypeDao videoTypeDao;

    @Override
    public List<VideoType> getAll() {
        return videoTypeDao.getAll();
    }
}
