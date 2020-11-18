package com.isoft.video.dao;

import com.isoft.video.entity.VideoType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface VideoTypeDao {
    @Select("select * from tb_videotype")
    List<VideoType> getAll() ;

    @Select("select id from tb_videotype where typename=#{typename}")
    Integer getIdByName(String typename);
}
