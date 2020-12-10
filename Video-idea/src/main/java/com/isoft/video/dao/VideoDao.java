package com.isoft.video.dao;

import com.isoft.video.entity.Video;
import org.apache.ibatis.annotations.*;

import java.io.File;
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

    @Select("select uname from tb_video where id=#{id}")
    String getVideoUname(int id);

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
    List<Video> getMoreBy(@Param("typeid") Integer typeid, @Param("title") String title,
                          @Param("pubdatetime") String pubdate, @Param("offset") Integer offset,
                          @Param("rows") Integer rows) ;

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
    int getMoreCount(@Param("typeid") Integer typeid, @Param("title") String title,
                     @Param("pubdatetime") String pubdate) ;

    @Update("update tb_video set status='通过' where id=#{id}")
    int updateStatus(Integer id);

    @Select("select * from tb_video where typeid=#{id} and status='通过'")
    List<Video> getVideoByType(Integer id);

//    @Select("select * from tb_video where id=#{id} and uname=#{uname}")
//    Video getVideo(Integer id,String uname);

    /**
     * 根据登录用户查找对应视频信息
     * @param uname
     * @return
     */
    @Select("select * from tb_video where uname = #{uname}")
    List<Video> getByUname(String uname) ;

    /**
     * 根据视频id修改视频状态
     * @param status
     * @param id
     * @return
     */
    @Update("update tb_video set status = #{status} where id=#{id}")
    Integer updateStatusById(@Param("status") String status , @Param("id") Integer id) ;

    /**
     * 添加视频记录
     * @param video
     * @return
     */
    @Insert("insert into tb_video(typeid , uname , title , description , pubdatetime , status , videopath)" +
            " values(#{typeid} , #{uname} , #{title} , #{description} , now() , '未审核' , #{videopath}) ")
    int addVideo(Video video) ;

//    @Insert("<script>" +
//            "insert into tb_video(typeid , uname , title , description , pubdatetime , status , videopath) " +
//            "values(#{typeid} , #{uname} , #{title} , #{description} , now() , '未审核' , #{videopath}) " +
//            "        <selectKey keyProperty=\"id\" order=\"AFTER\" resultType=\"int\">" +
//            "            select LAST_INSERT_ID()" +
//            "        </selectKey>" +
//            "</script>")
//    int addVideo(Video video) ;

    /**
     * 查找视频路径
     * @param uname
     * @return
     */
    @Select("select videopath from tb_video where uname = #{uname}")
    List<File> getVideoPathByUname(String uname);

    @Select("SELECT @@IDENTITY AS ID")
    Integer getNewId();

    @Select("<script>" +
            "select * from tb_video " +
            "        <if test=\"titleKey != null\"> " +
            "            <bind name=\"title\" value=\"'%'+titleKey+'%'\"/> " +
            "            where title like #{title} or description like #{title}" +
            "        </if>"
            +"</script>")
    List<Video> getByKeyWord(String titleKey) ;
}
