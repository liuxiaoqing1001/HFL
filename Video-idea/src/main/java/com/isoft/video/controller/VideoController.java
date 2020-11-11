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
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/file")
@AllArgsConstructor
public class VideoController {

    private final VideoUtil handler;


    @GetMapping("/video")
    public void videoPreview(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //获取resources文件夹的绝对地址
        String videoPath = "1.mp4";
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

}
