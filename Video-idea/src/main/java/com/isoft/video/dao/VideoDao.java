package com.isoft.video.dao;

import com.isoft.video.entity.Video;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface VideoDao {
    //查询数据库中所有信息
    @Select("select * from tb_video")
    List<Video> getAll() ;

    @Select("select * from tb_video where id=#{id}")
    Video getVideoById(int id) ;

    @Select("select videopath from tb_video where id=#{id}")
    String getVideoPath(int id );

    @Delete("delete from tb_video where id=#{id}")
    int delById(Integer id) ;

    @Delete("<script>" +
            "        delete from tb_video where id in" +
            "        <foreach collection=\"list\" item=\"delid\" separator=\",\" open=\"(\"  close=\")\">" +
            "            #{delid}" +
            "        </foreach>"
            +"</script>")
    int delMoreByIds(List<Integer> idList) ;

    @Select("<script>" +
            "select * from tb_video" +
            "        <where>" +
            "            <if test=\"null != typeid\">" +
            "                and typeid=#{typeid}" +
            "            </if>" +
            "            <if test=\"null != title\">" +
            "                <bind name=\"titleKey\" value=\"'%'+title+'%'\" />" +
            "                    and title like #{titleKey}" +
            "            </if>" +
            "            <if test=\"null != pubdatetime\">" +
            "                and DATE_FORMAT(pubdatetime,'%Y%m%d')=#{pubdatetime}" +
            "            </if>" +
            "        </where>"+
            " order by pubdatetime desc limit #{offset},#{rows}" +
            "</script>")
    List<Video> getMoreBy(@Param("typeid") Integer typeid, @Param("title") String title, @Param("pubdatetime") String pubdate, @Param("offset") Integer offset, @Param("rows") Integer rows) ;

    @Select("<script>" +
            "select count(*) from tb_video" +
            "        <where>" +
            "            <if test=\"null != typeid\">" +
            "                and typeid=#{typeid}" +
            "            </if>" +
            "            <if test=\"null != title\">" +
            "                <bind name=\"titleKey\" value=\"'%'+title+'%'\" />" +
            "                    and title like #{titleKey}" +
            "            </if>" +
            "            <if test=\"null != pubdatetime\">" +
            "                and DATE_FORMAT(pubdatetime,'%Y%m%d')=#{pubdatetime}" +
            "            </if>" +
            "        </where>"+
            "</script>")
    int getMoreCount(@Param("typeid") Integer typeid, @Param("title") String title, @Param("pubdatetime") String pubdate) ;

    @Update("update tb_video set status='通过' where id=#{id}")
    int updateStatus(Integer id);

    @Select("select * from tb_video where typeid=#{id}")
    List<Video> getVideoByType(Integer id);

//    @Select("select * from tb_video where id=#{id} and uname=#{uname}")
//    Video getVideo(Integer id,String uname);
}
