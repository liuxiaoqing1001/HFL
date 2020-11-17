package com.isoft.video.service.impl;

import com.isoft.video.dao.MsgDao;
import com.isoft.video.entity.Msg;
import com.isoft.video.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class MsgServiceImpl implements MsgService {

    @Autowired
    MsgDao msgDao;

    @Override
    public List<Msg> getAllMsg(String receiver) {
        return msgDao.getAllMsg(receiver);
    }

    @Override
    public Integer addMsg(Msg msg) {
        System.out.println(msg.toString());
        if(null == msg) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(msg.getTitle()) || StringUtils.isEmpty(msg.getContent()) ||
                StringUtils.isEmpty(msg.getSender()) || StringUtils.isEmpty(msg.getReceiver()) ||
                StringUtils.isEmpty(msg.getTime())) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        int r = msgDao.add(msg) ;
        if(r > 0) {
            return REG_MSG_OK ;
        } else {
            return REG_MSG_FAIL_OTHER ;
        }
    }
}