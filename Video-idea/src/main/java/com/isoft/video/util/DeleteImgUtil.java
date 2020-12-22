package com.isoft.video.util;

import org.springframework.util.ClassUtils;

import java.io.File;

/**
 * 删除文件
 */
public class DeleteImgUtil {
    /**
     * 删除文件，可以是单个文件或文件夹
     *
     * @param fileName
     *            待删除的文件名
     * @return 文件删除成功返回true,否则返回false
     */
    public static boolean delete(String fileName) {
        File file = new File(fileName);
        if (!file.exists()) {
            System.out.println("删除文件失败：" + fileName + "文件不存在");
            return false;
        } else {
            if (file.isFile()) {
                return deleteFile(fileName);
            } else {
                return false;
            }
        }
    }

    /**
     * 删除单个文件
     *
     * @param fileName
     *            被删除文件的文件名
     * @return 单个文件删除成功返回true,否则返回false
     */
    public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        if (file.isFile() && file.exists()) {
            file.delete();
            System.out.println("删除单个文件" + fileName + "成功！");
            return true;
        } else {
            System.out.println("删除单个文件" + fileName + "失败！");
            return false;
        }
    }

//    public static void main(String[] args) {
//        String fileName = "7.mp4";
//        String videoFramesPath = ClassUtils.getDefaultClassLoader().getResource("static/video/"+fileName).getPath();
//        DeleteImgUtil.delete(videoFramesPath);
//        System.out.println("deleted");
//    }
}
