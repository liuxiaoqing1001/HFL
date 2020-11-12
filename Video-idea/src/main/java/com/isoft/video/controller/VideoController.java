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
    public void videoPreview(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String videoPath=videoService.getVideoPath("liu",1);
        System.out.println(videoPath);
//        String videoPath = "1.mp4";
        //获取resources文件夹的绝对地址
        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+videoPath).getPath();
        Path filePath = Paths.get(sourcePath);
        if (Files.exists(filePath)) {
            String mimeType = Files.probeContentType(filePath);
            if (!StringUtils.isEmpty(mimeType)) {
                response.setContentType(mimeType);
            }
            request.setAttribute(VideoUtil.ATTR_FILE, filePath);
            handler.handleRequest(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
        }
    }

//    @GetMapping("/path")
//    public String getVideoPath(){
//        return videoService.getVideoPath("liu",1);
//    }

    //获取数据库全部信息
    @GetMapping("/getAll")
    public List<Video> getAll() {
        return videoService.getAll() ;
    }


    @GetMapping("/play2")
    public String videoPlay(Integer id, ModelMap model){
        Video video=videoService.getVideo(id);
        model.addAttribute("title",video.getTitle());
        model.addAttribute("videopath",video.getVideopath());
        return "videoPlay";
    }

}
