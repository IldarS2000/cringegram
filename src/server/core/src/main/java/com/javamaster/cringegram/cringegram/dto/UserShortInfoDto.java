package com.javamaster.cringegram.cringegram.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserShortInfoDto {
    private Long id;
    private String username;
    private byte[] avatar;
    private String aboutMe;
}
