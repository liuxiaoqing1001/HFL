package com.isoft.video.util;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;
import org.springframework.util.ClassUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * TODO：处理视频.（1.将视频提取成帧图片）
 *
 * @author ChenP
 */
public class VideoImgUtil {

    //视频文件路径
    private static String videoPath = ClassUtils.getDefaultClassLoader().getResource("static/video/").getPath();

    //视频帧图片存储路径
    public static String videoFramesPath = ClassUtils.getDefaultClassLoader().getResource("static/videoImg/").getPath();

    /**
     * TODO 将视频文件帧处理并以“jpg”格式进行存储。
     * 依赖FrameToBufferedImage方法：将frame转换为bufferedImage对象
     *
     * @param videoFileName
     */
    public static void grabberVideoFramer(String videoFileName,Integer vid) {
        //Frame对象
        Frame frame = null;
        //标识
        int flag = 5;

//        String vid = videoFileName.substring(0,videoFileName.lastIndexOf("."));
//        System.out.println(vid);

        /*
            获取视频文件
         */
        System.out.println("................."+videoPath);
        System.out.println("................."+videoPath + videoFileName);
        System.out.println("---------------------"+videoFramesPath);
        FFmpegFrameGrabber fFmpegFrameGrabber = new FFmpegFrameGrabber(videoPath + videoFileName);

        try {
            fFmpegFrameGrabber.start();
            /*
            .getFrameRate()方法：获取视频文件信息,总帧数
             */
            int ftp = fFmpegFrameGrabber.getLengthInFrames();
//            System.out.println(fFmpegFrameGrabber.grabKeyFrame());
            System.out.println("时长 " + ftp / fFmpegFrameGrabber.getFrameRate() / 60);

            BufferedImage bImage = null;
            System.out.println("开始运行视频提取帧，耗时较长");

            if (flag <= ftp) {
                //文件绝对路径+名字
                String fileName = videoFramesPath + vid+"_" + String.valueOf(flag) + ".jpg";
                System.out.println("fileName:"+fileName);
                //文件储存对象
                File outPut = new File(fileName);
                //获取帧
                frame = fFmpegFrameGrabber.grabImage();
//                System.out.println(frame);
                if (frame != null) {
                    ImageIO.write(FrameToBufferedImage(frame), "jpg", outPut);
                }
//                flag++;
            }
            System.out.println("============运行结束============");
            fFmpegFrameGrabber.stop();
        } catch (IOException E) {
        }
    }
    public static BufferedImage FrameToBufferedImage(Frame frame) {
        //创建BufferedImage对象
        Java2DFrameConverter converter = new Java2DFrameConverter();
        BufferedImage bufferedImage = converter.getBufferedImage(frame);
        return bufferedImage;
    }
    /*
        测试.....
     */
//    public static void main(String[] args) {
//        String videoFileName = "1.mp4";
//        grabberVideoFramer(videoFileName);
//    }
//    public static String getVideoPath() {
//        return videoPath;
//    }
//    public static void setVideoPath(String videoPath) {
//        VideoProcessing.videoPath = videoPath;
//    }
}
