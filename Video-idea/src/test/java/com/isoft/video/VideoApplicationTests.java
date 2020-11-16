package com.isoft.video;

import com.isoft.video.dao.UserDao;
import com.isoft.video.entity.Msg;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
class VideoApplicationTests {
    @Autowired
    UserDao userDao;

    @Test
    void contextLoads() {
        SimpleDateFormat sdf = (SimpleDateFormat) DateFormat.getDateTimeInstance();
        Date date = new Date();
        DateFormat.getDateTimeInstance().format(date);
        System.out.println("日期时间：" + sdf.format(date));
    }

}
