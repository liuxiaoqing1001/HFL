package com.isoft.video.controller;

import com.isoft.video.bean.Page;
import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.VideoType;
import com.isoft.video.service.VideoTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/videoType")
public class VideoTypeController {
    @Autowired
    VideoTypeService videoTypeService ;


    @GetMapping("page/{curPage}/{size}")
    public Map<String , Object> page(@PathVariable("curPage") Integer curPage , @PathVariable("size")Integer size ,
                                     @DateTimeFormat(pattern = "yyyy年MM月dd日") Date pubdate){
        Page<VideoType> page = videoTypeService.videoTypePage(curPage , size) ;
        Map<String  , Object> map = new HashMap<>() ;
        map.put("total" , page.getRowCount()) ;
        map.put("rows" , page.getData()) ;
        return map ;
    }


    @GetMapping("getAllType")
    public ResponseData videotypeAll(){
        return new ResponseData(
                0,
                "请求成功" ,
                videoTypeService.getAll()

        );
    }

    @DeleteMapping("delete/{id}")
    public ResponseData delById(@PathVariable("id") Integer id) {
        boolean r = videoTypeService.delById(id) ;
        return new ResponseData(
                r ? 0 : 1 ,
                r ? "删除成功" : "删除失败" ,
                r
        ) ;
    }

    @PutMapping("typename/{typename}/{id}")
    public ResponseData update(@PathVariable("typename") String typename, @PathVariable("id") Integer id) {
        boolean r = videoTypeService.updateById(typename,id);
        return new ResponseData(
                r ? 0 : 1 ,
                r ? "更新成功" : "更新失败" ,
                r
        ) ;
    }

    @PostMapping("add/{typename}")
    public ResponseData add(@PathVariable("typename")String typename){
        boolean r =videoTypeService.add(typename);
        return new ResponseData(
                r ? 0 : 1 ,
                r ? "增加成功" : "增加失败" ,
                r

        );
    }
    @GetMapping("nameCount/{typename}")
    public ResponseData nameCount(@PathVariable("typename")String typename){
        boolean r=videoTypeService.nameCount(typename);
        return new ResponseData(
                r ? 1 : 0 ,
                r ? "已存在该类型" : "" ,
                r

        );


    }
}
