package com.javamaster.cringegram.cringegram.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDto {
    private Long id;
    private String username;
    private byte[] avatar;
    private String aboutMe;
    private Integer postCount;
    private Integer subscriptionCount;
    private Integer subscribersCount;
}
