package com.javamaster.cringegram.cringegram.dto;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

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
