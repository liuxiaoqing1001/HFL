package com.isoft.video.dao;

import com.isoft.video.entity.Collect;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CollectDao {
    /**
     * 查询所有
     * @return
     */
    @Select("select c.id , c.vid , c.uname , v.description from tb_collect c , tb_video v where c.uname=#{uname} and c.vid=v.id")
    List<Collect> getAllByUname(String uname) ;

    /**
     * 根据用户名查询收藏记录
     * @param uname
     * @return
     */
    @Select("select count(*) from tb_collect where uname=#{uname} and vid=#{vid}")
    int getByUname(@Param("uname") String uname, @Param("vid") int vid) ;

    /**
     * 插入收藏记录
     * @param collect
     * @return
     */
    @Insert("insert into tb_collect values(null , #{vid} , #{uname})")
    Integer addCollect(Collect collect) ;

    @Delete("delete from tb_collect where vid=#{vid} and uname=#{uname}")
    Integer deleteCollect(@Param("vid") int vid, @Param("uname") String uname) ;

    @Select("select count(*) from tb_collect where vid=#{vid}")
    Integer getCCount(int vid);
}
