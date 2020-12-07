package com.isoft.video.controller;

import com.alibaba.druid.util.StringUtils;
import com.isoft.video.bean.NonStaticResourceHttpRequestHandler;
import com.isoft.video.bean.Page;
import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Msg;
import com.isoft.video.entity.Video;
import com.isoft.video.service.MsgService;
import com.isoft.video.service.VideoService;
import com.isoft.video.service.VideoTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/video")
//@AllArgsConstructor
public class VideoController {

    @Autowired
    VideoService videoService;

    @Autowired
    VideoTypeService videoTypeService;

    @Autowired
    MsgService msgService;

    private final NonStaticResourceHttpRequestHandler nonStaticResourceHttpRequestHandler;

    public VideoController(NonStaticResourceHttpRequestHandler nonStaticResourceHttpRequestHandler) {
        this.nonStaticResourceHttpRequestHandler = nonStaticResourceHttpRequestHandler;
    }

    @GetMapping("/play/{vid}")
    public String getVideos(HttpServletResponse response,@PathVariable("vid") Integer id) throws Exception{
        String videoPath=videoService.getVideoPath(id);
        //获取resources文件夹的绝对地址
        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+videoPath).getPath();
//        System.out.println(sourcePath);
        FileInputStream fis = null;
        OutputStream os = null ;
        fis = new FileInputStream(sourcePath);
        // 得到文件大小
        int size = fis.available();
        byte data[] = new byte[size];
        // 读数据
        fis.read(data);
        fis.close();
//        fis = null;
        // 设置返回的文件类型
        response.setContentType("video/mp4");
        os = response.getOutputStream();
        os.write(data);
        os.flush();
        os.close();
//        os = null;
        return null;
    }

//    private final VideoUtil handler;
//
////    不稳定
//    public void videoPreview(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        String videoPath=videoService.getVideoPath("liu",1);
//        System.out.println(videoPath);
////        String videoPath = "1.mp4";
//        //获取resources文件夹的绝对地址
//        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+videoPath).getPath();
//        Path filePath = Paths.get(sourcePath);
//        if (Files.exists(filePath)) {
//            String mimeType = Files.probeContentType(filePath);
//            if (!StringUtils.isEmpty(mimeType)) {
//                response.setContentType(mimeType);
//            }
//            request.setAttribute(VideoUtil.ATTR_FILE, filePath);
//            handler.handleRequest(request, response);
//        } else {
//            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
//            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
//        }
//    }

    @GetMapping("/path/{vid}")
    public ResponseData getVideoPath(@PathVariable("vid") Integer vid){
        return new ResponseData(
                0,
                "请求成功",
                videoService.getVideoPath(vid)
        );
    }

    @GetMapping("/uname/{vid}")
    public ResponseData getVideoUname(@PathVariable("vid") Integer vid){
        return new ResponseData(
                0,
                "请求成功",
                videoService.getVideoUname(vid)
        );
    }

    @GetMapping("/videoType")
    public ResponseData videoType(){
        return new ResponseData(
                0,
                "请求成功",
                videoTypeService.getAll()
        );
    }

    @GetMapping("/getByKeyWord/{title}")
    public ResponseData getByKeyWord(@PathVariable("title") String title) {
        List<Video> v = videoService.getByKeyWord(title);
        return new ResponseData(
                0,
                "请求成功",
                v
        ) ;
    }

//    //获取数据库全部信息
//    @GetMapping("/getAll")
//    public List<Video> getAll() {
//        return videoService.getAll() ;
//    }

    //获取数据库全部信息,分页
    @GetMapping("page")
    public Map<String,Object> page(Integer curPage, Integer size, Integer typeid,
                                   String title, @DateTimeFormat(pattern = "yyyy年MM月dd日") Date pubdate){
        Page<Video> page=videoService.videoPage(typeid,title,pubdate,curPage,size);
        Map<String,Object> map= new HashMap<>();
        map.put("total",page.getRowCount());
        map.put("rows",page.getData());
        return map;
    }

    @DeleteMapping("del/{id}")
    public ResponseData delById(@PathVariable("id") Integer id) {
        boolean r = videoService.delById(id) ;
        return new ResponseData(
                r ? 0 : 1 ,
                r ? "删除成功" : "删除失败" ,
                r
        ) ;
    }

    @DeleteMapping("/del/ids")
    public ResponseData delByIds(Integer[] id){
        boolean r = videoService.delByIds(Arrays.asList(id));
        return new ResponseData(
                r?0:1,
                r?"删除成功":"删除失败",
                r
        );
    }

    /**
     * 修改审核状态
     * @param id
     * @return
     */
    @GetMapping("/update/status/{id}")
    public ResponseData updateStatus(@PathVariable("id") Integer id){
        if(id== null || id < 1) {
            return null ;
        }else {
            boolean result = videoService.updateStatus(id);
            return new ResponseData(
                    result?0:1,
                    result?"修改审核状态成功":"修改审核状态失败",
                    result
            );
        }
    }

    /**
     * 发送审核消息
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

    @GetMapping("/getVideoByType/{typename}")
    public ResponseData getVideoByType(@PathVariable("typename") String typename) {
        return new ResponseData(
                0,
                "请求成功",
                videoService.getVideoByType(typename)
        );
    }

    @GetMapping("/getVideoById/{id}")
    public ResponseData getVideoById(@PathVariable("id") Integer id) {
        Video v = videoService.getVideoById(id) ;
        return new ResponseData(
                v !=null ? 0 : 1 ,
                v !=null ? "请求成功" : "请求失败" ,
                v
        ) ;
    }

    /**
     * 根据用户名查询相关视频列表
     * @param uname
     * @return
     */
    @GetMapping("{uname}")
    public List<Video> getByUname(@PathVariable("uname") String uname) {
        return videoService.getByUname(uname);
    }

    /**
     * 根据id修改视频状态
     * @param status
     * @param id
     * @return
     */
    @PutMapping("{status}/{id}")
    public ResponseData updateStatusById(@PathVariable("status") String status, @PathVariable("id") Integer id) {
        Integer updateStatus = videoService.updateStatusById(status, id);
        Video video = new Video() ;
        video.setStatus(status);
        return new ResponseData(
                updateStatus > 0 ? 0 : 1 ,
                updateStatus > 0 ? "更新成功" : "更新失败" ,
                video.getStatus()
        ) ;
    }

    /**
     * 上传视频
     * @param request
     * @param response
     * @param file 上传的文件，支持多文件
     * @throws Exception
     */
    @PostMapping("/upload/insert")
    @ResponseBody
    public ResponseData insert(HttpServletRequest request,HttpServletResponse response
            ,@RequestParam("file") MultipartFile[] file) throws Exception{
        //组合image名称，“;隔开”
        List<String> fileName =new ArrayList<>();
//        System.out.println("file:"+file);
//        System.out.println("file.length:"+file.length);
        if(file!=null&&file.length>0){
            try {
                for (int i = 0; i < file.length; i++) {
                    if (!file[i].isEmpty()) {
                        fileName.add(file[i].getOriginalFilename());
//                        System.out.println("fileName:"+fileName);
                        //上传文件，随机名称，";"分号隔开
                        // fileName.add(FileUtil.uploadImage(request, "/upload/"+TimeUtils.formateString(new Date(), "yyyy-MM-dd")+"/", file[i], true));
                    }
                }

                //上传成功
                return new ResponseData(
                        fileName!= null && fileName.size() > 0 ? 0 : 1 ,
                        fileName!= null && fileName.size() > 0 ? "上传成功！" : "上传失败！文件格式错误！" ,
                        fileName
                ) ;
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(response.toString()+ "上传出现异常！异常出现在：class.UploadController.insert()");
            }
        }else {
            System.out.println(response.toString()+ "没有检测到文件！");
        }
        return null ;
    }

    /**
     * 添加视频到数据库
     * @param map
     * @return
     */
    @PostMapping("addVideo")
    public ResponseData addVideo(HttpServletResponse response,@RequestBody Map<String , Object> map) {
        Video video = new Video() ;
        String videopathAll = (String)map.get("videopathAll");
        video.setUname((String)map.get("uname"));
        video.setTypeid(Integer.parseInt(map.get("typeid").toString()));
        video.setTitle((String)map.get("title"));
        video.setDescription((String)map.get("description"));
        video.setVideopath((String)map.get("videopath"));
        Integer result = videoService.addVideo(video);
        //调用下载视频的方法
        loadVideo(videopathAll);
//        getVideos(response,7);
        return new ResponseData(
                result > 0 ? 0 : 1 ,
                result > 0 ? "添加成功！" : "添加失败！" ,
                result
        ) ;
    }

    @GetMapping("/newId")
    public ResponseData getNewId() {
        return new ResponseData(
                0,
                "请求成功",
                videoService.getNewId()
        );
    }

    /**
     * 下载视频
     * @param videopathAll
     */
    @GetMapping("loadVideo/{videopathAll}")
    public void loadVideo(@PathVariable("videopathAll") String videopathAll) {
        FileInputStream fis = null;
        FileOutputStream fos = null ;
        String originName = null ;
        try {
            String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
//            System.out.println("path-------------------------------->" + path);

            fis = new FileInputStream(videopathAll);
            //创建字节输出流对象，构造方法中绑定写入的目的地
            // 1）获取上传文件名
            originName = videopathAll.substring(videopathAll.lastIndexOf("/") + 1);
//            System.out.println("originName:" + originName);

            fos = new FileOutputStream(path +"static/video/"+ originName) ;//newPath + "/" + originName
            //使用字节流对象中的方法 read 读取文件
            //使用数组缓冲读取多个字节写入多个字节
            byte[] bytes = new byte[1024] ;
            int len = 0 ;
            while ((len = fis.read(bytes)) != -1) {
                fos.write(bytes , 0 , len);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //释放资源  【先关闭写的后关闭读的】
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
