package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Collect;
import com.isoft.video.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/collect")
public class CollectController {
    @Autowired
    CollectService collectService;

    /**
     * 查询所有收藏记录
     * @return
     */
    @GetMapping("/getAllByUname/{uname}")
    public List<Collect> getAllByUname(@PathVariable("uname") String uname) {
        return collectService.getAllByUname(uname);
    }

    /**
     * 根据用户名和视频id查找数量
     * @param uname
     * @param vid
     * @return
     */
    @GetMapping("/getCount/{uname}/{vid}")
    public Integer getByUname(@PathVariable("uname") String uname , @PathVariable("vid") int vid) {
        return collectService.getByUname(uname, vid) ;
    }

    /**
     * 添加收藏记录
     * @param map
     * @return
     */
    @PostMapping("addCollect")
    public ResponseData addCollect(@RequestBody Map<String, Object> map) {
        Collect collect = new Collect();
        collect.setVid(Integer.parseInt(map.get("vid").toString()));
        collect.setUname((String) map.get("uname"));
        Integer result = collectService.addCollect(collect);
        String msg = "";
        switch (result) {
            case CollectService.COLLECT_MSG_OK:
                msg = "收藏成功";
                break;
            case CollectService.COLLECT_MSG_FAIL_NAMEEXISTS:
                msg = "您已经收藏过该视频";
                break;
            case CollectService.COLLECT_MSG_FAIL_INFO_NON:
                msg = "收藏信息不完整";
                break;
            default:
                msg = "收藏失败";
                break;
        }
        return new ResponseData(
                result,
                msg,
                result == 0
        );
    }

    /**
     * 删除收藏记录
     * @param vid
     * @param uname
     * @return
     */
    @DeleteMapping("deleteCollect/{vid}/{uname}")
    public ResponseData deleteCollect(@PathVariable("vid") int vid , @PathVariable("uname") String uname) {
        Integer result = collectService.deleteCollect(vid, uname) ;
        return new ResponseData(
           result > 0 ? 0 : 1 ,
           result > 0 ? "删除成功！" : "删除失败！" ,
           result
        ) ;

    }
}
