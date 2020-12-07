package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Praise;
import com.isoft.video.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/praise")
public class PraiseController {
    @Autowired
    PraiseService praiseService;

    /**
     * 查询所有点赞记录
     * @return
     */
    @GetMapping("/getAllByUname/{uname}")
    public List<Praise> getAllByUname(@PathVariable("uname") String uname) {
        return praiseService.getAllByUname(uname);
    }

    /**
     * 根据用户名和视频id查找数量
     * @param uname
     * @param vid
     * @return
     */
    @GetMapping("/getCount/{uname}/{vid}")
    public Integer getByUname(@PathVariable("uname") String uname , @PathVariable("vid") int vid) {
        return praiseService.getByUname(uname, vid) ;
    }

    @GetMapping("/getPCount/{vid}")
    public ResponseData getPCount( @PathVariable("vid") Integer vid) {
        return new ResponseData(
                0,
                "请求成功",
                praiseService.getPCount(vid)
        );
    }

    /**
     * 添加点赞记录
     * @param map
     * @return
     */
    @PostMapping("addPraise")
    public ResponseData addPraise(@RequestBody Map<String, Object> map) {
        Praise praise = new Praise();
        praise.setVid(Integer.parseInt(map.get("vid").toString()));
        praise.setUname((String) map.get("uname"));
        Integer result = praiseService.addPraise(praise);
        String msg = "";
        switch (result) {
            case PraiseService.PRAISE_MSG_OK:
                msg = "点赞成功";
                break;
            case PraiseService.PRAISE_MSG_FAIL_NAMEEXISTS:
                msg = "您已经赞过该视频";
                break;
            case PraiseService.PRAISE_MSG_FAIL_INFO_NON:
                msg = "点赞信息不完整";
                break;
            default:
                msg = "点赞失败";
                break;
        }
        return new ResponseData(
                result,
                msg,
                result == 0
        );
    }

    /**
     * 删除点赞记录
     * @param vid
     * @param uname
     * @return
     */
    @DeleteMapping("deletePraise/{vid}/{uname}")
    public ResponseData deletePraise(@PathVariable("vid") int vid , @PathVariable("uname") String uname) {
        Integer result = praiseService.deletePraise(vid, uname) ;
        return new ResponseData(
           result > 0 ? 0 : 1 ,
           result > 0 ? "删除成功！" : "删除失败！" ,
           result
        ) ;

    }
}
