package com.isoft.video.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoType implements Serializable {
    private Integer id ;
    private String typename ;

    private ArrayList<Video> newsList ;
}
