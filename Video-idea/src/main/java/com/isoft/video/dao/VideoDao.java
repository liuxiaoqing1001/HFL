package com.isoft.video.dao;

import com.isoft.video.entity.Video;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface VideoDao {
    //查询数据库中所有信息
    @Select("select * from tb_video")
    List<Video> getAll() ;

    @Select("select videopath from tb_video where uname=#{uname} and id=#{id}")
    String getVideoPath(String uname, int id );

//    @Select("select * from tb_video where id=#{id} and uname=#{uname}")
//    Video getVideo(Integer id,String uname);
}
