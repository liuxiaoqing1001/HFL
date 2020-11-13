package com.isoft.video.controller;

import com.isoft.video.entity.User;
import com.isoft.video.entity.Video;
import com.isoft.video.service.VideoService;
import com.isoft.video.util.VideoUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/video")
@AllArgsConstructor
public class VideoController {

    @Autowired
    VideoService videoService;

    private final VideoUtil handler;

    @GetMapping("/play")
//    @GetMapping(value = "/getVideos")
    public String getVideos(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String videoPath=videoService.getVideoPath("liu",1);
        //获取resources文件夹的绝对地址
        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+videoPath).getPath();
        System.out.println(sourcePath);
        FileInputStream fis = null;
        OutputStream os = null ;
        fis = new FileInputStream(sourcePath);
        int size = fis.available(); // 得到文件大小
        byte data[] = new byte[size];
        fis.read(data); // 读数据
        fis.close();
//        fis = null;
        response.setContentType("video/mp4"); // 设置返回的文件类型
        os = response.getOutputStream();
        os.write(data);
        os.flush();
        os.close();
//        os = null;
        return null;
    }
//    不稳定
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

//    @GetMapping("/path")
//    public String getVideoPath(){
//        return videoService.getVideoPath("liu",1);
//    }

    //获取数据库全部信息
    @GetMapping("/getAll")
    public List<Video> getAll() {
        return videoService.getAll() ;
    }


}
