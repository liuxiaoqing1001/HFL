package com.isoft.video.dao;

import com.isoft.video.entity.Video;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VideoMapper {
    Video getVideo(Integer id);
}
