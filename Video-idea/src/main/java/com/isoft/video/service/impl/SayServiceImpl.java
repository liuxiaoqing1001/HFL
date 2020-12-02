package com.isoft.video.service.impl;

import com.isoft.video.dao.SayDao;
import com.isoft.video.entity.Say;
import com.isoft.video.service.SayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Integer upDateCount(Integer id, Integer praise) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.upDateCount(id, praise);
    }

    @Override
    public Integer getPraiseCount(Integer id) {
        if(id==null || id<1){
            return null;
        }
        return sayDao.PraiseCount(id);
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
     * @param name
     * @return
     */

    @Override
    public List<Say> getData(String uname, String name) {
        return sayDao.get(uname,name);
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
    public Say getAdata(Integer id) {
        if(id == null || id < 1) {
            return null ;
        }

        return sayDao.getAdata(id);
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
