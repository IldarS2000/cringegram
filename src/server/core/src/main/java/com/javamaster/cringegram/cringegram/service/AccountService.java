package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.UpdateAboutMeDto;
import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {
    UserInfoDto getUserInfo(Long userId);

    UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token);

    UserInfoDto updateUserAvatar(MultipartFile image, String token);

    Void deleteUserAvatar(String token);

    UserInfoDto updateUserAboutMe(UpdateAboutMeDto updateAboutMeDto, String token);

    byte[] getUserAvatar(Long userId);

    UserInfoDto changeSubscription(Long user, String token);
}
