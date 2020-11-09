package com.isoft.video.controller;

import com.isoft.video.util.VideoUtil;
import lombok.AllArgsConstructor;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/file")
@AllArgsConstructor
public class VideoController {

    private final VideoUtil nonStaticResourceHttpRequestHandler;


    @GetMapping("/video")
    public void videoPreview(HttpServletRequest request, HttpServletResponse response) throws Exception {

        //假如我把视频1.mp4放在了static下的video文件夹里面
        //sourcePath 是获取resources文件夹的绝对地址
        //realPath 即是视频所在的磁盘地址

        URL url = this.getClass().getClassLoader().getResource("static/video/tweetsip.mp4");

//        String sourcePath = ClassUtils.getDefaultClassLoader().getResource("").getPath().substring(1);
//        String sourcePath =
        System.out.println("-------------------------------------------------"+url+"-------------------------------------------------");
//        String realPath = sourcePath +"static/video/tweetsip.mp4";


        Path filePath = Paths.get(url.getPath() );
        if (Files.exists(filePath)) {
            String mimeType = Files.probeContentType(filePath);
            if (!StringUtils.isEmpty(mimeType)) {
                response.setContentType(mimeType);
            }
            request.setAttribute(VideoUtil.ATTR_FILE, filePath);
            nonStaticResourceHttpRequestHandler.handleRequest(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
        }
    }

}
