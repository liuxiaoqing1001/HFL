package com.isoft.video;

import com.isoft.video.dao.UserDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class VideoApplicationTests {
    @Autowired
    UserDao userDao;

    @Test
    void contextLoads() {
        System.out.println(userDao.nameSearch("admin"));
    }

}
