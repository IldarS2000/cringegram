package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;

public interface AccountService {
    UserInfoDto getUserInfo(Long userId);

    UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token);
}
