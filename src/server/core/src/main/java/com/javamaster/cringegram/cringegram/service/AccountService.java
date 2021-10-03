package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.UserInfoDto;

public interface AccountService {
    UserInfoDto getUserInfo(Long userId);
}
