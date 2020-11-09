package com.isoft.video.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    private Integer id;
    private String name;
    private String password;
    private Integer age ;
    private  String sex ;
    private String email , mobile , photourl , address , status;
    private Date regdate ;
    private Integer role ;

}
