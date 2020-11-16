package com.isoft.video.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Msg implements Serializable {
    private Integer id;
    private String title;
    private  String content ;
    @DateTimeFormat(pattern = "yyyy年MM月dd日 HH:mm:ss")
    @JsonFormat(pattern = "yyyy年MM月dd日 HH:mm:ss" , timezone = "Asia/Shanghai")
    private Date time ;
    private String sender;
    private String receiver;
}
