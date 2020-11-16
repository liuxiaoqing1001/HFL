package com.isoft.video.controller;

import com.isoft.video.bean.Page;
import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.Msg;
import com.isoft.video.entity.User;
import com.isoft.video.entity.Video;
import com.isoft.video.service.MsgService;
import com.isoft.video.service.UserService;
import com.isoft.video.service.VideoService;
import com.isoft.video.service.VideoTypeService;
import com.isoft.video.util.VideoUtil;
import lombok.AllArgsConstructor;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/play/{vid}")
    public String getVideos(HttpServletRequest request, HttpServletResponse response,@PathVariable("vid") Integer id) throws Exception{
        String videoPath=videoService.getVideoPath(id);
        //获取resources文件夹的绝对地址
        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+videoPath).getPath();
        System.out.println(sourcePath);
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

    @GetMapping("/videoType")
    public ResponseData videoType(){
        return new ResponseData(
                0,
                "请求成功",
                videoTypeService.getAll()
        );
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

    @PostMapping("/addMsg")
    public ResponseData addMsg(@RequestBody Map<String , Object> map) {
        Msg msg = new Msg() ;
        msg.setTitle((String)map.get("title"));
        msg.setContent((String)map.get("content"));
        msg.setSender((String)map.get("sender"));
        msg.setReceiver((String)map.get("receiver"));
        msg.setTime((Date) map.get("time"));
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
