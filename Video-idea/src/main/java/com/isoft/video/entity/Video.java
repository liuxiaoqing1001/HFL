package com.isoft.video.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Video implements Serializable {
    private Integer id;
    private Integer typeid;
    private String uname;
    private String title;
    private  String describtion ;
    private Date pubdatetime ;
    private String status;
    private String videopath;
}
