package com.javamaster.cringegram.cringegram.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostDto {
    private Long id;
    private Long userId;
    private Date createTimestamp;
    private byte[] photo;
    private String description;
    private Integer likeCount;
    private Integer commentsCount;
}
