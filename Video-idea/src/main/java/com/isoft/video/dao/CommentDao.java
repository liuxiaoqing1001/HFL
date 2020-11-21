package com.isoft.video.dao;

import com.isoft.video.entity.Comment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommentDao {
    @Select("select * from tb_comment where vid=#{vid}")
    List<Comment> getAllByVid(Integer vid);

    @Insert("insert into tb_comment(vid,comment,sender,receiver,time) " +
            "values(#{vid},#{comment},#{sender},#{receiver},#{time})")
    int add(Comment comment);

    @Select("select count(*) from tb_comment where vid=#{vid}")
    int getSumByVId(Integer vid);
}
