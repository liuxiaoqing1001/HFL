package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.dao.SayDao;
import com.isoft.video.entity.Say;
import com.isoft.video.service.SayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/say")
public class SayController {
    @Autowired
    SayService sayService;

    @Autowired
    SayDao sayDao;

    @GetMapping("/getAll")
    public ResponseData getAll(){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.getAll()
        );
    }

    /**
     * 不看某一个人的说说
     * @param id
     * @param uname
     * @return
     */

    @GetMapping("/getSay/{id}/{uname}")
    public ResponseData getSay(@PathVariable("id")Integer id, @PathVariable("uname")String uname){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.getOtherSay(id,uname)
        );
    }

    @GetMapping("/OtherSay/{ids}/{uname}")
    public ResponseData OtherSay(@PathVariable("ids")Integer[] ids, @PathVariable("uname")String uname){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.OtherSay(ids,uname)
        );
    }
    @GetMapping("/forward/{id}")
    public ResponseData forward(@PathVariable("id") Integer id){
        return new ResponseData(
                0 ,
                "转发成功" ,
                sayService.forward(id)
        );

    }

    /**
     * 查看别人的说说
     * @param uname
     * @return
     */
    @GetMapping("getSay/{uname}")
    public ResponseData getSay(@PathVariable("uname")String uname){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.getSay(uname)
        );
    }
    //查看id  一条说说

    @GetMapping("/getMost/{id}")
    public ResponseData getAdata(@PathVariable("id") Integer id){
        return new ResponseData(
                0,
                "请求成功",
                sayService.getAdata(id)
        );
    }
    //不看某一个人的说说
    @GetMapping("/Ignore/{uname1}/{uname2}")
    public ResponseData getOther(@PathVariable("uname1") String uname1, @PathVariable("uname2") String uname2){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.getOther(uname1, uname2)
        );
    }


    //自己的说说
    @GetMapping("/MyData/{uname}/{name}")
    public ResponseData getAperson(@PathVariable("uname") String uname, @PathVariable("name") String name){
        return new ResponseData(
                0 ,
                "请求成功" ,
                sayService.getData(uname,name)
        );
    }
    //发表
    @PostMapping("/publish")
    public ResponseData Publish(Say say){
        Integer result = sayService.publish(say);
        return new ResponseData(
                result > 0 ? 0 : 1 ,
                result > 0 ? "发表成功！" : "发表失败！" ,
                result
        );
    }
    //修改说说
    @PutMapping("/Update/{say}/{id}")
    public ResponseData upSay(@PathVariable("say") String say, @PathVariable("id")Integer id){
        Integer r=sayService.upSay(say, id);
        return new ResponseData(
                r != null ? 0 : 1 ,
                r != null ? "修改成功" : "修改失败" ,
                r
        );
    }

    //删除说说

    @DeleteMapping("/delete/{id}")
    public ResponseData delById(@PathVariable("id")Integer id){
        Integer r =sayService.delById(id);
        return new ResponseData(
                r != null ? 0 : 1 ,
                r != null ? "删除" : "删除失败" ,
                r
        );
    }

    @GetMapping("/getPraiseCount/{id}")
    public ResponseData getpraiseCount(@PathVariable("id")Integer id){
        Integer r =sayService.getPraiseCount(id);
        return new ResponseData(
                r != null ? 0 : 1 ,
                r != null ? "获取数量" : "失败" ,
                r
        );
    }

    @PutMapping("/praiseCount/{id}/{praise}")
    public ResponseData UppraiseCount(@PathVariable("id")Integer id, @PathVariable("praise")Integer praise){
        Integer r =sayService.upDateCount(id,praise);
        return new ResponseData(
                r != null ? 0 : 1 ,
                r != null ? "更新成功" : "更新失败" ,
                r
        );
    }
}
