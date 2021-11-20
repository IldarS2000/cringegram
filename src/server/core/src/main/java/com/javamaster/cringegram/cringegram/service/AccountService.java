package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {
    UserInfoDto getUserInfo(Long userId);

    UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token);

    UserInfoDto updateUserAvatar(MultipartFile image, String token);

    Void deleteUserAvatar(String token);

    UserInfoDto updateUserAboutMe(UpdateAboutMeDto updateAboutMeDto, String token);

    UserAvatarDto getUserAvatar(Long userId);

    UserInfoDto changeSubscription(Long user, String token);

    UserShortInfoDto getUserShortInfo(Long userId);
}
