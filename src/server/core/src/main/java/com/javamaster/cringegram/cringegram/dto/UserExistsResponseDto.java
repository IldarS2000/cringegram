package com.javamaster.cringegram.cringegram.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserExistsResponseDto {

    private boolean exists;
}
