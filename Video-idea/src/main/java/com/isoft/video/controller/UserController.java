package com.isoft.video.controller;

import com.isoft.video.bean.Page;
import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Msg;
import com.isoft.video.entity.User;
import com.isoft.video.service.MsgService;
import com.isoft.video.service.UserService;
import com.isoft.video.util.FileUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService ;

    @Autowired
    MsgService msgService;

    /**
     * 登录
     * @param name
     * @param password
     * @return
     */
    @GetMapping("{name}/{pwd}")
    public ResponseData login(@PathVariable("name") String name , @PathVariable("pwd") String password) {
        // 调用service中方法进行login处理
        Map<String , Object> map = userService.loginCheck(name , password) ;
        String msg = "" ;
        Integer status = (Integer)(map.get(UserService.KEY_MSG)) ;
        switch (status) {
            case UserService.LOGIN_MSG_OK :
                msg = "登录成功" ;
                break;
            case UserService.LOGIN_MSG_FAIL_ERROR :
                msg = "账号或密码错误" ;
                break;
            case UserService.LOGIN_MSG_FAIL_NON:
                msg = "账号不存在" ;
                break;
            default :
                msg = "登录失败" ;
                break;
        }

        User u = new User() ;
        u.setId(1) ;
        u.setName(name);
        u.setPassword(DigestUtils.md5DigestAsHex("123".getBytes()));

        return new ResponseData(
                status ,
                msg ,
                map.get(UserService.KEY_USER)
        ) ;
    }

    /**
     * 注册
     * @param map
     * @return
     */
    @PostMapping("")
    public ResponseData register(@RequestBody Map<String , Object> map) {
        User user = new User() ;
        user.setName((String)map.get("name"));
        user.setPassword((String)map.get("password"));
        user.setAge(Integer.parseInt(map.get("age").toString()));
        user.setSex((String)map.get("sex"));
        user.setEmail((String)map.get("email"));
        user.setMobile((String)map.get("mobile"));
        user.setPhotourl((String)map.get("photourl"));
        Integer result = userService.register(user) ;
        String msg = "" ;
        switch (result) {
            case UserService.REG_MSG_OK :
                msg = "注册成功" ;
                break;
            case UserService.REG_MSG_FAIL_NAMEEXISTS :
                msg = "账户已存在" ;
                break;
            case UserService.REG_MSG_FAIL_INFO_NON:
                msg = "注册信息不完整" ;
                break;
            default :
                msg = "注册失败" ;
                break;
        }
        return new ResponseData(
                result ,
                msg,
                result == 0
        ) ;
    }

    /**
     * 更新
     * @param user
     * @return
     */
    @PutMapping("/update")
    public ResponseData update(User user) {
        User u = userService.update(user) ;
        return new ResponseData(
                u !=null ? 0 : 1 ,
                u !=null ? "更新成功" : "更新失败" ,
                u
        ) ;
    }

    /**
     * 用户列表的分页实现
     * @param curPage
     * @param size
     * @param id
     * @param name
     * @param regdate
     * @return
     */
    @GetMapping("/page/{size}/{curPage}")
    public Map<String , Object> page(@PathVariable("curPage") Integer curPage , @PathVariable("size") Integer size ,
                                     Integer id , String name , @DateTimeFormat(pattern = "yyyy年MM月dd日") Date regdate){
        Page<User> page = userService.newsPage(id , name , regdate , curPage , size) ;
        Map<String  , Object> map = new HashMap<>() ;
        map.put("pageCount" , page.getPageCount()) ;   //总页数
        map.put("curPage",page.getCurPage()) ;  //当前页数
        map.put("total" , page.getRowCount()) ; //总行数
        map.put("rows" , page.getData()) ;  //本页数据
        return map ;
    }

    /**
     * 根据id获取数据库相关信息
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public User getById(@PathVariable("id") Integer id) {
        return userService.getById(id) ;
    }

    /**
     * 根据id删除相关用户信息
     * @param id
     * @return
     */
    @DeleteMapping("/delete/{id}")
    public ResponseData deleteById(@PathVariable("id") Integer id) {
        int result = userService.DeleteById(id) ;
        return  new ResponseData(
                result !=0 ? 0 : 1 ,
                result !=0 ? "删除成功" : "删除失败" ,
                result
        ) ;
    }

    /**
     * 用户上传头像
     */
    @Value("${userphoto.path}")    // 从配置文件中读取 userphoto.path属性的值
    private String upPhotoPath ;
    @PostMapping("photo")
    public ResponseData upPhoto(@RequestParam("userphoto") MultipartFile file, Integer id , HttpServletRequest request) {
        // 保存是否成功boolean
        boolean  result = false ;
        // 上传文件物理路径,构造文件名
        String photoPath , newFile , photoUri = null;

        User userResult = null ;
        if(! file.isEmpty()) {
            // 构造上传文件新名字
            // 1）获取上传文件名
            String originName = file.getOriginalFilename() ;
            // 2）获取文件扩展名
            String extName = originName.substring(originName.lastIndexOf(".")) ;
            // 3）构造文件新名字
            newFile = new SimpleDateFormat("yyyyMMddHHmmssSSSS").format(new Date()) + "_" + id + extName ;
            System.out.println(newFile);

            // 构造文件上传保存物理路径
            ServletContext app = request.getServletContext() ;
            photoPath = app.getRealPath(upPhotoPath) + "/" ;
            // 判断文件保存的物理路径是否存在，不存在创建
            File f = new File(photoPath) ;
            if(! f.exists()) {
                f.mkdirs() ;
            }
            // 保存文件
            try {
                file.transferTo(new File(photoPath + newFile));
                System.out.println(new File(photoPath + newFile  + "---ok"));
                result  = true ;
                // 构造所保存文件的基于http协议的uri
                photoUri = FileUtil.url(request , upPhotoPath , newFile) ;
                System.out.println(photoUri);
                // 修改数据库
                User user = new User();
                user.setId(id);
                user.setAge(user.getAge());
                user.setSex(user.getSex());
                user.setEmail(user.getEmail());
                user.setMobile(user.getMobile());
                user.setAddress(user.getAddress());
                user.setPhotourl(photoUri);
                userResult = userService.update(user) ;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new ResponseData(
                userResult != null ? 0 : 1 ,
                userResult != null  ? "修改成功" : "修改失败" ,
                userResult
        ) ;
    }

    //获取数据库全部信息
    @GetMapping("/getAll")
    public List<User> getAll() {
        return userService.getAll() ;
    }

    @GetMapping("/getAllMsg/{receiver}")
    public ResponseData getAllMsg(@PathVariable("receiver") String uname) {
        return new ResponseData(
                0,
                "请求成功",
                msgService.getAllMsg(uname)
        );
    }

    @DeleteMapping("delMsg/{id}")
    public ResponseData delById(@PathVariable("id") Integer id) {
        boolean r = msgService.delById(id) ;
        return new ResponseData(
                r ? 0 : 1 ,
                r ? "删除成功" : "删除失败" ,
                r
        ) ;
    }

    @DeleteMapping("/delAll/{receiver}")
    public ResponseData delByIds(@PathVariable("receiver") String receiver){
        boolean r = msgService.delAll(receiver);
        return new ResponseData(
                r?0:1,
                r?"删除成功":"删除失败",
                r
        );
    }
}
