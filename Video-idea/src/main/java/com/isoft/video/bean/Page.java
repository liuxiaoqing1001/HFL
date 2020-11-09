package com.isoft.video.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Page<T> implements Serializable {
    /**
     * 本页数据
     */
    private ArrayList<T> data ;
    /**
     * 当前页面
     */
    private Integer curPage ;
    /**
     * 记录总数
     */
    private Integer rowCount ;
    /**
     * 每页记录个数
     */
    private Integer size ;
    /**
     * 总页数
     */
    private  Integer pageCount ;
}
