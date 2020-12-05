package com.isoft.video.service.impl;

import com.isoft.video.dao.CollectDao;
import com.isoft.video.entity.Collect;
import com.isoft.video.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class CollectServiceImpl implements CollectService {
    @Autowired
    CollectDao collectDao ;

    @Override
    public List<Collect> getAllByUname(String uname) {
        return collectDao.getAllByUname(uname);
    }

    @Override
    public int getByUname(String uname, int vid) {
        return collectDao.getByUname(uname, vid);
    }

    @Override
    public Integer addCollect(Collect collect) {
        if(null == collect) {
            return COLLECT_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(collect.getVid()) || StringUtils.isEmpty(collect.getUname())) {
            return COLLECT_MSG_FAIL_INFO_NON ;
        }
        // 先进行账号是否存在检测
        int nameCount = collectDao.getByUname(collect.getUname() , collect.getVid()) ;
        if(nameCount > 0) {
            return COLLECT_MSG_FAIL_NAMEEXISTS ;
        }
        // 添加收藏记录
        collect.setVid(collect.getVid());
        collect.setUname(collect.getUname());
        int r = collectDao.addCollect(collect) ;
        if(r > 0) {
            return COLLECT_MSG_OK ;
        } else {
            return COLLECT_MSG_FAIL_OTHER ;
        }
    }

    @Override
    public Integer deleteCollect(int vid, String uname) {
        return collectDao.deleteCollect(vid , uname);
    }


}
