package com.isoft.video.service.impl;

import com.isoft.video.bean.Page;
import com.isoft.video.dao.UserDao;
import com.isoft.video.entity.User;
import com.isoft.video.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao ;
    @Override
    public Map<String, Object> loginCheck(String name, String pwd) {
        Map<String , Object> map = new HashMap<>() ;
        if(StringUtils.isEmpty(name) || StringUtils.isEmpty(pwd)) {
            map.put(KEY_MSG , LOGIN_MSG_FAIL_OTHER) ;
            return map ;
        }
        // 先进行账号是否存在检测
        int nameCount = userDao.nameSearch(name) ;
        if(nameCount == 0) {
            map.put(KEY_MSG , LOGIN_MSG_FAIL_NON) ;
            return map ;
        }
        // 账号存在，登录检查
        User u = userDao.select(name , DigestUtils.md5DigestAsHex(pwd.getBytes())) ;
        System.out.println(u);
        if(u == null) {
            map.put(KEY_MSG , LOGIN_MSG_FAIL_ERROR) ;
            return map ;
        }
        map.put(KEY_USER , u) ;
        map.put(KEY_MSG , LOGIN_MSG_OK) ;
        if (u.getRole() == 0) {
            map.put(KEY_ROLE , ROLE_ADMIN) ;
        } else if (u.getRole() == 1) {
            map.put(KEY_ROLE , ROLE_USER) ;
        }
        return map;
    }

    @Override
    public Integer register(User user) {
        System.out.println(user.toString());
        if(null == user) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(user.getName()) || StringUtils.isEmpty(user.getPassword()) ||
                StringUtils.isEmpty(user.getAge()) || StringUtils.isEmpty(user.getSex()) ||
                StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getMobile()) ||
                StringUtils.isEmpty(user.getPhotourl())) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        // 先进行账号是否存在检测
        int nameCount = userDao.nameSearch(user.getName()) ;
        if(nameCount > 0) {
            return REG_MSG_FAIL_NAMEEXISTS ;
        }
        // 注册
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setAge(user.getAge());
        user.setSex(user.getSex());
        user.setEmail(user.getEmail());
        user.setMobile(user.getMobile());
//        user.setPhotourl(user.getPhotourl());
//        user.setRole(user.getRole());
        int r = userDao.add(user) ;
        if(r > 0) {
            return REG_MSG_OK ;
        } else {
            return REG_MSG_FAIL_OTHER ;
        }
    }

    //修改
    @Override
    public User update(User user) {
        if(null == user) {
            return null ;
        }
        if(user.getId() == null || user.getId() < 1) {
            return null ;
        }
        if(null != user.getPassword()) {
            user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        }
        int r = userDao.updateById(user) ;
        if(r != 1) {
            return null ;
        } else {
            return userDao.getById(user.getId()) ;
        }
    }

    @Override
    public Page<User> newsPage(Integer id, String name, Date regdate, Integer curPage, Integer size) {
        if(null == curPage || curPage < 1) {
            curPage = 1 ;
        }
        if(null == size || size < 1) {
            size = 10 ;
        }
        String pubdateStr = null ;
        if(null != regdate) {
            pubdateStr = new SimpleDateFormat("yyyyMMdd").format(regdate) ;
        }
        List<User> list = userDao.getMoreBy(id , name , pubdateStr , size * (curPage-1) , size) ;
        int count = userDao.getMoreCount(id , name , pubdateStr) ;
        int pageCount = (int) Math.ceil(count * 1.0 / size);
        Page<User> pageInfo = new Page() ;
        pageInfo.setData((ArrayList<User>) list);
        pageInfo.setCurPage(curPage);
        pageInfo.setPageCount(pageCount);
        pageInfo.setRowCount(count) ;
        pageInfo.setSize(size);
        return pageInfo ;
    }

    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }

    //根据id获取用户信息
    @Override
    public User getById(Integer id) {
        return userDao.getById(id);
    }

    //根据id删除用户信息
    @Override
    public int DeleteById(Integer id) {
        return userDao.DeleteById(id);
    }

    @Override
    public Integer upRole(Integer id) {
        if(id == null || id<1) {
            return null ;
        }
        int r = userDao.upRole(id) ;
        if(r != 1) {
            return null ;
        } else {
            return userDao.upRole(id) ;
        }
    }

    @Override
    public Integer delById(Integer id) {
        if(id == null || id<1) {
            return null ;
        }
        int r = userDao.delById(id) ;
        if(r != 1) {
            return null ;
        } else {
            return userDao.delById(id) ;
        }
    }

    @Override
    public Page<User> RolePage(Integer curPage, Integer size) {
        if(null == curPage || curPage < 1) {
            curPage = 1 ;
        }
        if(null == size || size < 1) {
            size = 10 ;
        }
        List<User> list = userDao.getLimit(size * (curPage-1) , size) ;
        int count = userDao.getCount() ;
        int pageCount = (int) Math.ceil(count * 1.0 / size);
        Page<User> pageInfo = new Page() ;
        pageInfo.setData((ArrayList<User>) list);
        pageInfo.setCurPage(curPage);
        pageInfo.setPageCount(pageCount);
        pageInfo.setRowCount(count) ;
        pageInfo.setSize(size);
        return pageInfo ;
    }

    @Override
    public Integer addRole(User user) {
//        System.out.println(user.toString());
        if(null == user) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        if(StringUtils.isEmpty(user.getName()) || StringUtils.isEmpty(user.getPassword()) ||
                StringUtils.isEmpty(user.getAge()) || StringUtils.isEmpty(user.getSex()) ||
                StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getMobile())) {
            return REG_MSG_FAIL_INFO_NON ;
        }
        // 先进行账号是否存在检测
        int nameC = userDao.nameSearch(user.getName()) ;
        if(nameC > 0) {
            return REG_MSG_FAIL_NAMEEXISTS ;
        }
        // 注册
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        user.setAge(user.getAge());
        user.setSex(user.getSex());
        user.setEmail(user.getEmail());
        user.setMobile(user.getMobile());
//        user.setPhotourl(user.getPhotourl());
//        user.setRole(user.getRole());
//        System.out.println(user);
        int r = userDao.addRole(user) ;
        if(r > 0) {
            return REG_MSG_OK ;
        } else {
            return REG_MSG_FAIL_OTHER ;
        }    }

}
