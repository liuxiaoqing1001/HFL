package com.isoft.video.dao;

import com.isoft.video.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDao {
    // -- select 用户名是否存在
    @Select("select count(*) from tb_user where name=#{name}")
    int nameSearch(String name) ;
    // select 根据用户名和密码查找用户
    @Select("select * from tb_user where name=#{uname} and password=#{pwd}")
    User select(@Param("uname") String name, @Param("pwd") String password) ;
    // -- insert 添加用户
    @Insert("insert into tb_user(name,password,age,sex,email,mobile,photourl,status) " +
            "values(#{name},#{password},#{age},#{sex},#{email},#{mobile},#{photourl},1)")
    int add(User user) ;

    //查询数据库中所有信息
    @Select("select * from tb_user")
    List<User> getAll() ;

    @Update("<script>" +
            "update tb_user " +
            "        <set> " +
            "            <if test=\"null != password\">" +
            "                password=#{password} , " +
            "            </if>\n" +
            "            <if test=\"null != photourl\"> " +
            "                photourl=#{photourl}, " +
            "            </if>\n" +
            "            <if test=\"null != status\"> " +
            "                status = #{status} , " +
            "            </if>\n" +
            "            <if test=\"null != mobile\"> " +
            "                mobile=#{mobile} , " +
            "            </if>" +
            "        </set> " +
            "        where id=#{id}"
            +"</script>")
    int updateById(User user) ;

//    @Update("<script>" +
//            "update tb_user " +
//            "        <set> " +
//            "            <if test=\"null != age\">" +
//            "                age=#{age} , " +
//            "            </if>\n" +
//            "            <if test=\"null != gender\">" +
//            "                gender=#{gender} , " +
//            "            </if>\n" +
//            "            <if test=\"null != email\">" +
//            "                email=#{email} , " +
//            "            </if>\n" +
//            "            <if test=\"null != password\">" +
//            "                password=#{password} , " +
//            "            </if>\n" +
//            "            <if test=\"null != photourl\"> " +
//            "                photourl=#{photourl}, " +
//            "            </if>\n" +
//            "            <if test=\"null != status\"> " +
//            "                status = #{status} , " +
//            "            </if>\n" +
//            "            <if test=\"null != mobile\"> " +
//            "                mobile=#{mobile} , " +
//            "            </if>" +
//            "        </set> " +
//            "        where id=#{id}"
//            +"</script>")

    @Select("select * from tb_user where id=#{id}")
    User getById(Integer id) ;


    @Select("<script>" +
            "select * from tb_user" +
            "        <where>" +
            "            <if test=\"null != id\">" +
            "                and id=#{id}" +
            "            </if>" +
            "            <if test=\"null != name\">" +
            "                    and name = #{name}" +
            "            </if>" +
            "            <if test=\"null != regdate\">" +
            "                and DATE_FORMAT(regdate,'%Y%m%d')=#{regdate}" +
            "            </if>" +
            "        </where>"+
            " order by regdate desc limit #{offset},#{rows}" +
            "</script>")
    List<User> getMoreBy(@Param("id") Integer id , @Param("name") String name , @Param("regdate") String regdate, @Param("offset") Integer offset , @Param("rows") Integer rows) ;

    @Select("<script>" +
            "select count(*) from tb_user" +
            "        <where>" +
            "            <if test=\"null != id\">" +
            "                and id=#{id}" +
            "            </if>" +
            "            <if test=\"null != name\">" +
            "                    and name = #{name}" +
            "            </if>" +
            "            <if test=\"null != regdate\">" +
            "                and DATE_FORMAT(regdate,'%Y%m%d')=#{regdate}" +
            "            </if>" +
            "        </where>"+
            "</script>")
    int getMoreCount(@Param("id") Integer id , @Param("name") String name , @Param("regdate") String regdate) ;



}
