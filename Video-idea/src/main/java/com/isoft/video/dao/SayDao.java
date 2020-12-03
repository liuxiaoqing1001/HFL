package com.isoft.video.dao;

import com.isoft.video.entity.Msg;
import com.isoft.video.entity.Say;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SayDao {
    /**
     * 得到发表的所有说说
     * @return
     */
    @Select("select s.*,u.photourl from tb_user u,tb_say s where u.name=s.uname order by s.time desc")
    List<Say> getAll();

    @Select("select praise from tb_say where id=#{id}")
    Integer getPraiseCount(Integer id);

    @Update("update tb_say set praise=#{praise} where vid=#{vid}")
    Integer upDateCount(@Param("vid") Integer vid, @Param("praise") Integer praise);

    @Select("select collect from tb_say where id=#{id}")
    Integer getCollectCount(Integer id);

    @Update("update tb_say set collect=#{collect} where vid=#{vid}")
    Integer upCollectCount(@Param("vid") Integer vid, @Param("collect") Integer collect);

    @Select("select uname,say from tb_say where id=#{id} ")
    Say forward(Integer id);

    @Select("select s.*,u.photourl " +
            "from  tb_user u,tb_say s " +
            "where s.uname not in (select uname FROM `tb_say` where id=#{id}) " +
            "and uname!=#{uname}  " +
            "and u.name=s.uname " +
            "order by s.time desc")
    List<Say> getOtherSay(@Param("id") Integer id, @Param("uname") String uname);

    @Select("<script>" +
            "select s.*,u.photourl " +
            "from  tb_user u,tb_say s " +
            "where s.uname not in (select uname from tb_say where id  in" +
            "<foreach collection=\"id\"  item=\"id\" open=\"(\" separator=\",\" close=\")\"> " +
            "        #{id} " +
            "    </foreach>"+
            ") " +
            "and uname!=#{uname} " +
            "and u.name=s.uname " +
            "order by s.time desc"+
            "</script>")
    List<Say> OtherSay(@Param("id") Integer[] idList, @Param("uname") String uname);







    /**
     * 查看别人的说说
     * @param uname
     * @return
     */

    @Select("select s.*,u.photourl " +
            "from tb_user u,tb_say s " +
            "where u.name=s.uname and " +
            "u.name!=#{uname} order by s.time desc")
    List<Say> getSay(@Param("uname") String uname);

    /**
     * 只看某一个人的说说
     * @param uname
     * @param name
     * @return
     */
    @Select("select s.*,u.photourl from tb_user u,tb_say s where s.uname=#{uname} and u.name=#{name} order by s.time desc")
    List<Say> get(@Param("uname") String uname, @Param("name") String name);

//    /**
//     * 根据id查内容
//     * @param id
//     * @return
//     */
//    @Select("select s.id,s.uname,u.photourl " +
//            "from tb_user u,tb_say s " +
//            "where u.name=s.uname and s.id=#{id}")
//    Say getPAndC(Integer vid);

    /**
     * 根据vid查praise,collect
     * @param vid
     * @return
     */
    @Select("select praise,collect from tb_say where vid=#{vid}")
    Say getPAndC(Integer vid);

    /**
     * 不看某个人的说说
     * @return
     */

    @Select("select s.*,u.photourl " +
            "from tb_user u,tb_say s " +
            "where u.name=s.uname and " +
            "u.name!=#{uname1} and u.name!=#{uname2}")
    List<Say> getOther(@Param("uname1") String uname1, @Param("uname2") String uname2);


    @Insert("insert into tb_say(uname,time,say,praise) values(#{uname},now(),#{say},0)")
    int publish(Say say);

    @Delete("delete from tb_say where id=#{id}")
    int delById(Integer id);

    @Update("update tb_say set say=#{say},time=NOW() where id=#{id}")
    int upSay(@Param("say") String say, @Param("id") Integer id);

    @Insert("insert into tb_say(uname,vid,time,say,praise,collect) " +
            "values(#{uname},#{vid},#{time},#{say},#{praise},#{collect})")
    int add(Say say);
}
