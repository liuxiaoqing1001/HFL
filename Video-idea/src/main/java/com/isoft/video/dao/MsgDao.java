package com.isoft.video.dao;

import com.isoft.video.entity.Msg;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MsgDao {

    @Select("select * from tb_msg where receiver=#{receiver}  order by time desc")
    List<Msg> getAllMsg(String receiver);

    @Insert("insert into tb_msg(title,content,sender,receiver,time) " +
            "values(#{title},#{content},#{sender},#{receiver},#{time})")
    int add(Msg msg);

    @Delete("delete from tb_msg where id=#{id}")
    int delById(Integer id) ;

    @Delete("delete from tb_msg where receiver=#{receiver}")
    int delAll(String receiver);

    @Delete("delete from tb_msg where sender=#{uname} and content like CONCAT('%',#{content},'%') " +
            "and receiver=#{receiver} and title like '%点赞%'")
    Integer delMsgP(String uname, String content, String receiver);

    @Delete("delete from tb_msg where sender=#{uname} and content like CONCAT('%',#{content},'%') " +
            "and receiver=#{receiver} and title like '%收藏%'")
    Integer delMsgC(String uname, String content, String receiver);
}
