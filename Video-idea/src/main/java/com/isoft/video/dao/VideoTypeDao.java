package com.isoft.video.dao;

import com.isoft.video.entity.VideoType;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface VideoTypeDao {
    @Select("select * from tb_videotype")
    List<VideoType> getAll() ;

    @Select("select id from tb_videotype where typename=#{typename}")
    Integer getIdByName(String typename);

    @Select("select count(*) from tb_videotype")
    int getCount() ;

    @Select("<script>" +
            "select * from tb_videotype " +
            " order by id asc limit #{offset},#{rows}"
            +"</script>")
    List<VideoType> getMoreLimit(@Param("offset") Integer offset , @Param("rows") Integer rows) ;

    @Insert("insert into tb_videotype(typename) values (#{typename})")
    int add(String typename);

    @Delete("delete from tb_videotype where id=#{id}")
    int delById(Integer id) ;

    @Update("update tb_videotype set typename=#{typename} where id=#{id}")
    int update(@Param("typename")String typename,@Param("id")Integer id) ;

    @Select("select count(*) from tb_videotype where typename=#{typename}")
    int nameCount(@Param("typename")String typename);
}
