package com.isoft.video.util;


import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Base64;

public class FileUtil {
    /**
     * 文件下载
     */
    public static void downFile(HttpServletRequest request , HttpServletResponse response , String path , String filename) throws IOException {
        //2.使用字节输入流加载文件到内存
        //2.1找到文件服务器路径
        ServletContext servletContext = request.getServletContext();
        String realPath = servletContext.getRealPath("/" + path + "/" + filename);
        //2.1用字节流关联
        FileInputStream fis = new FileInputStream(realPath);

        //解决中文名乱码问题
        //获取浏览器请求头
        String userAgent = request.getHeader("user-agent");
        //处理编码格式
        filename = getFileName(userAgent, filename);

        //3.设置response的响应头
        //3.1设置响应头类型：content-type
        String mimeType = servletContext.getMimeType(filename);
        response.setHeader("content-type",mimeType);
        //3.2设置响应头打开方式：content-disposition
        response.setHeader("content-disposition","attachment;filename="+filename);

        //4.将输入流的数据写出到输出流中
        ServletOutputStream sos = response.getOutputStream();
        byte[] bytes=new byte[1024*8];
        int len;
        while ((len=fis.read(bytes))!=-1){
            sos.write(bytes,0,len);
        }
    }


    /**
     * 将参数路径+文件名字映射一个网络绝对url : http:// ....
     * @param path
     * @param fileName
     * @return
     */
    public static String url(HttpServletRequest request , String path , String fileName) {
        path = path == null ? "" : path ;
        String protocol = request.getProtocol() ;  // HTTP/1.1
        protocol = protocol.substring(0 , protocol.indexOf("/")) ;
        String url = protocol + "://" +
                request.getServerName() + ":" +
                request.getServerPort() + "/" +
                request.getContextPath() + "/" +
                path + "/" + fileName ;
        System.out.println(url);
        return url;
    }
    public static String url(HttpServletRequest request ,  String fileName) {
        String protocol = request.getProtocol() ;  // HTTP/1.1
        protocol = protocol.substring(0 , protocol.indexOf("/")) ;
        String url = protocol + "://" +
                request.getServerName() + ":" +
                request.getServerPort() + "/" +
                request.getContextPath() + "/" +
                "/" + fileName ;
        System.out.println(url);
        return url;
    }

    /**
     * 改变文件名编码格式，避免中文乱码
     */
    public static String getFileName(String agent, String filename) throws UnsupportedEncodingException {
        if(null == agent) {
            return URLEncoder.encode(filename, "utf-8") ;
        }
        if (agent.contains("MSIE")) {
            // IE浏览器
            filename = URLEncoder.encode(filename, "utf-8");
            filename = filename.replace("+", " ");
        } else if (agent.contains("Firefox")) {
            // 火狐浏览器
            filename = "=?utf-8?B?" + Base64.getEncoder().encode(filename.getBytes("utf-8")) + "?=";
        } else {
            // 其它浏览器
            filename = URLEncoder.encode(filename, "utf-8");
        }
        return filename;
    }
}
