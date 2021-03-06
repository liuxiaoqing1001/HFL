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
//    @Insert("insert into tb_user(name,password,age,sex,email,mobile,photourl,status) " +
//            "values(#{name},#{password},#{age},#{sex},#{email},#{mobile},#{photourl},1)")
//    int add(User user) ;
    @Insert("insert into tb_user(name,password,age,sex,email,mobile,role,regdate) " +
            "values(#{name},#{password},#{age},#{sex},#{email},#{mobile},1,now())")
    int add(User user) ;

    //查询数据库中所有信息
    @Select("select * from tb_user")
    List<User> getAll() ;

    //根据id更新内容
    @Update("<script>" +
            "update tb_user " +
            "        <set> " +
            "            <if test=\"null != password\">" +
            "                password=#{password} , " +
            "            </if>\n" +
            "            <if test=\"null != age\">" +
            "                age=#{age} , " +
            "            </if>\n" +
            "            <if test=\"null != sex\"> " +
            "                sex=#{sex}, " +
            "            </if>\n" +
            "            <if test=\"null != email\"> " +
            "                email = #{email} , " +
            "            </if>\n" +
            "            <if test=\"null != mobile\"> " +
            "                mobile=#{mobile} , " +
            "            </if>" +
            "            <if test=\"null != photourl\"> " +
            "                photourl=#{photourl}, " +
            "            </if>\n" +
            "            <if test=\"null != status\"> " +
            "                status = #{status} , " +
            "            </if>\n" +
            "            <if test=\"null != role\">" +
            "                role=#{role} , " +
            "            </if>\n" +
            "        </set> " +
            "        where id=#{id}"
            +"</script>")
    int updateById(User user) ;

    //根据id查找对应用户信息
    @Select("select * from tb_user where id=#{id}")
    User getById(Integer id) ;

    //分页
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


    //根据id删除对应用户信息
    @Delete("delete from tb_user where id=#{id}")
    int DeleteById(Integer id) ;

    @Update("update tb_user set role=1 where id=#{id}")
    int upRole(@Param("id")Integer id);

    @Delete("delete from tb_user where id=#{id}")
    int delById(Integer id);

    @Select("select count(*) from tb_user where role=0")
    Integer getCount();

    @Select("select * from tb_user where role=0 order by id asc limit #{offset},#{rows}")
    List<User> getLimit(@Param("offset")Integer offset,@Param("rows")Integer rows);

    @Insert("insert into tb_user(name,password,age,sex,email,mobile,photourl,role,regdate) " +
            "values(#{name},#{password},#{age},#{sex},#{email},#{mobile},#{photourl},0,now())")
    int addRole(User user);

    @Select("select photourl from tb_user where name=#{name}")
    String getPhotoUrl(String name);

    @Select("select * from tb_user where name=#{name}")
    User searchByName(@Param("name") String name);

    //修改密码
    @Update("update tb_user set password=#{password} where name=#{name}")
    int forget(@Param("password") String password, @Param("name") String name) ;

}
