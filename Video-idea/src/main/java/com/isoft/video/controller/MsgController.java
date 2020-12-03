package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.dao.MsgDao;
import com.isoft.video.entity.Msg;
import com.isoft.video.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/msg")
public class MsgController {
    @Autowired

    MsgService msgService;

    @Autowired
    MsgDao msgDao;

    /**
     * 发送消息
     * @param map
     * @return
     */
    @PostMapping("/addMsg")
    public ResponseData addMsg(@RequestBody Map<String , Object> map) {
        Msg msg = new Msg() ;
        msg.setTitle((String)map.get("title"));
        msg.setContent((String)map.get("content"));
        msg.setSender((String)map.get("sender"));
        msg.setReceiver((String)map.get("receiver"));
        msg.setTime(new Date());
        Integer result = msgService.addMsg(msg) ;
        String str = "" ;
        switch (result) {
            case MsgService.REG_MSG_OK :
                str = "发送消息成功" ;
                break;
            case MsgService.REG_MSG_FAIL_INFO_NON:
                str = "信息不完整" ;
                break;
            default :
                str = "发送失败" ;
                break;
        }
        return new ResponseData(
                result ,
                str,
                result == 0
        ) ;
    }

}
