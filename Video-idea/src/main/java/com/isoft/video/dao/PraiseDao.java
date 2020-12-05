package com.isoft.video.dao;

import com.isoft.video.entity.Praise;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PraiseDao {
    /**
     * 查询所有
     * @return
     */
    @Select("select *  from tb_praise  where uname=#{uname}")
    List<Praise> getAllByUname(String uname) ;

    /**
     * 根据用户名查询收藏记录
     * @param uname
     * @return
     */
    @Select("select count(*) from tb_praise where uname=#{uname} and vid=#{vid}")
    int getByUname(@Param("uname") String uname, @Param("vid") int vid) ;

    /**
     * 插入点赞记录
     * @param praise
     * @return
     */
    @Insert("insert into tb_praise values(null , #{vid} , #{uname})")
    Integer addPraise(Praise praise) ;

    /**
     * 删除点赞记录
     * @param vid
     * @param uname
     * @return
     */
    @Delete("delete from tb_praise where vid=#{vid} and uname=#{uname}")
    Integer deletePraise(@Param("vid") int vid, @Param("uname") String uname) ;
}
