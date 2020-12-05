package com.isoft.video.service.impl;

import com.isoft.video.dao.SayDao;
import com.isoft.video.entity.Say;
import com.isoft.video.service.SayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class SayServiceImpl implements SayService {

    @Autowired
    SayService sayService;
    @Autowired
    SayDao sayDao;
    @Override
    public List<Say> getAll() {
        return sayDao.getAll();
    }

    @Override
    public List<Say> getOtherSay(Integer id, String uname) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.getOtherSay(id, uname);
    }

    @Override
    public Say forward(Integer id) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.forward(id);
    }

    @Override
    public Integer upPraiseCount(Integer vid, Integer praise) {
        if(vid==null || vid<1){
            return null;
        }
        return sayDao.upDateCount(vid, praise);
    }

    @Override
    public Integer getPraiseCount(Integer id) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.getPraiseCount(id);
    }

    @Override
    public Integer upCollectCount(Integer vid, Integer collect) {
        if(vid==null || vid<1){
            return null;
        }
        return sayDao.upCollectCount(vid, collect);
    }

    @Override
    public Integer getCollectCount(Integer id) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.getCollectCount(id);
    }

    @Override
    public List<Say> OtherSay(Integer[] idList, String uname) {
        return sayDao.OtherSay(idList, uname);
    }

    /**
     * 查看别人的说说
     * @param uname
     * @return
     */

    @Override
    public List<Say> getSay(String uname) {
        return sayDao.getSay(uname);
    }

    /**
     * 看自己的说说
     * @param uname
     * @return
     */

    @Override
    public List<Say> getData(String uname) {
        return sayDao.get(uname);
    }

    @Override
    public List<Say> getOther(String uname1, String uname2) {
        return sayDao.getOther(uname1,uname2);
    }

    /**
     * 发表说说
     * @param say
     * @return
     */

    @Override
    public Integer publish(Say say) {
        say.setUname(say.getUname());
        say.setSay(say.getSay());
        return sayDao.publish(say);
    }

    /**
     * 更改说说
     * @param say
     * @param id
     * @return
     */

    @Override
    public Integer upSay(String say, Integer id) {
        if(id == null || id < 1) {
            return null ;
        }

        int r = sayDao.upSay(say, id);
        if(r != 1) {
            return null ;
        } else {
            return sayDao.upSay(say, id);
        }
    }

    @Override
    public Say getPAndC(Integer vid) {
        if(vid == null || vid < 1) {
            return null ;
        }

        return sayDao.getPAndC(vid);
    }

    @Override
    public Integer addSay(Say say) {
        if(null == say) {
//            System.out.println("x");
            return REG_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(say.getUname()) || StringUtils.isEmpty(say.getVid()) ||
                StringUtils.isEmpty(say.getTime()) || StringUtils.isEmpty(say.getSay())) {
//            System.out.println("2");
            return REG_MSG_FAIL_INFO_NON ;
        }
        int r = sayDao.add(say) ;
        if(r > 0) {
            return REG_MSG_OK ;
        } else {
            return REG_MSG_FAIL_OTHER ;
        }
    }


    @Override
    public Integer delById(Integer id) {
        if(id == null || id<1) {
            return null ;
        }

        int r = sayDao.delById(id) ;
        if(r != 1) {
            return null ;
        } else {
            return sayDao.delById(id) ;
        }
    }
}
