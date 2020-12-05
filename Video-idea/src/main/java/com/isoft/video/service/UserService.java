package com.isoft.video.service;

import com.isoft.video.bean.Page;
import com.isoft.video.entity.User;

import java.util.Date;
import java.util.List;
import java.util.Map;


public interface UserService {
    public static final int REG_MSG_OK = 0 ;
    public static final int REG_MSG_FAIL_NAMEEXISTS = 1 ;
    public static final int REG_MSG_FAIL_INFO_NON = 2 ;
    public static final int REG_MSG_FAIL_OTHER = 3 ;

    String KEY_USER = "User" ;
    String KEY_MSG = "Msg" ;
    String KEY_ROLE = "Role" ;
    int LOGIN_MSG_OK = 0 ;
    int LOGIN_MSG_FAIL_NON = 1 ;
    int LOGIN_MSG_FAIL_ERROR = 2 ;
    int LOGIN_MSG_FAIL_OTHER = 3 ;
    int ROLE_ADMIN = 0 ;
    int ROLE_USER = 1 ;
    /**
     *
     * @param name  非空
     * @param pwd  非空
     * @return  key--User , key-msg ; 其中 key-msg的值 0-成功；1-账号不存在；2-用户名或密码错误；3-登录失败
     */
    Map<String , Object> loginCheck(String name , String pwd) ;

    /**
     *
     * @param user 非空，名字和密码非空
     * @return Integer ：0--成功；1--用户名已存在；2--信息不完整；3--失败，其他原因
     */
    Integer register(User user) ;

    /**
     * 根据id修改个人信息，可以修改 电话、头像、状态、密码
     * @param user 非空，id非空，mobile、photoutl、status、password 至少一项不为空
     * @return
     */
    User update(User user) ;

    /**
     * 分页
     * @param id
     * @param name
     * @param regdate
     * @param curPage
     * @param size
     * @return
     */
    Page<User> newsPage(Integer id , String name , Date regdate , Integer curPage , Integer size) ;

    List<User> getAll() ;

    //根据id获取用户信息
    User getById(Integer id) ;

    //根据id删除用户信息
    int DeleteById(Integer id) ;

    Integer upRole(Integer id);

    Integer delById(Integer id);

    Page<User> RolePage(Integer curPage , Integer size);

    Integer addRole(User user);

    String getPhotoUrl(String name);

    User searchByName(String name);

    Integer forget(String password, String name);
}
