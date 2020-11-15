package com.isoft.video.controller;

import com.isoft.video.bean.ResponseData;
import com.isoft.video.entity.User;
import com.isoft.video.entity.Video;
import com.isoft.video.service.VideoService;
import com.isoft.video.service.VideoTypeService;
import com.isoft.video.util.VideoUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/video")
//@AllArgsConstructor
public class VideoController {

    @Autowired
    VideoService videoService;

    @Autowired
    VideoTypeService videoTypeService;

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

    //获取数据库全部信息
    @GetMapping("/getAll")
    public List<Video> getAll() {
        return videoService.getAll() ;
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

}
