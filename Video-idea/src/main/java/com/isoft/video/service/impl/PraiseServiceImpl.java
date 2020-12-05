package com.isoft.video.service.impl;


import com.isoft.video.dao.PraiseDao;
import com.isoft.video.entity.Praise;
import com.isoft.video.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class PraiseServiceImpl implements PraiseService {
    @Autowired
    PraiseDao praiseDao;

    @Override
    public List<Praise> getAllByUname(String uname) {
        return praiseDao.getAllByUname(uname);
    }

    @Override
    public int getByUname(String uname, int vid) {
        return praiseDao.getByUname(uname, vid);
    }

    @Override
    public Integer addPraise(Praise praise) {
        if(null == praise) {
            return PRAISE_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(praise.getVid()) || StringUtils.isEmpty(praise.getUname())) {
            return PRAISE_MSG_FAIL_INFO_NON ;
        }
        // 先进行账号是否存在检测
        int nameCount = praiseDao.getByUname(praise.getUname() , praise.getVid()) ;
        if(nameCount > 0) {
            return PRAISE_MSG_FAIL_NAMEEXISTS ;
        }
        // 添加收藏记录
        praise.setVid(praise.getVid());
        praise.setUname(praise.getUname());
        int r = praiseDao.addPraise(praise) ;
        if(r > 0) {
            return PRAISE_MSG_OK ;
        } else {
            return PRAISE_MSG_FAIL_OTHER ;
        }
    }

    @Override
    public Integer deletePraise(int vid, String uname) {
        return praiseDao.deletePraise(vid , uname);
    }


}
