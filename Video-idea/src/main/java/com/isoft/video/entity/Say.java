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
public class Say implements Serializable {
    private Integer id;
    private String uname;
    private Integer vid;
    @DateTimeFormat(pattern = "yyyy年MM月dd日 HH:mm:ss")
    @JsonFormat(pattern = "yyyy年MM月dd日 HH:mm:ss",timezone = "Asia/Beijing")
    private Date time;
    private String say;
    private String photourl;
    private Integer praise;
    private Integer collect;

}
