package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AccountService {
    UserInfoDto getUserInfo(Long userId, String token);

    UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token);

    UserInfoDto updateUserAvatar(MultipartFile image, String token);

    Void deleteUserAvatar(String token);

    UserInfoDto updateUserAboutMe(UpdateAboutMeDto updateAboutMeDto, String token);

    UserAvatarDto getUserAvatar(Long userId);

    UserInfoDto changeSubscription(Long user, String token);

    UserShortInfoDto getUserShortInfo(Long userId);

    List<UserShortInfoDto> searchUsers(String searchTerm, String token);

    List<UserShortInfoDto> getUserSubscribers(Long userId, String token);

    List<UserShortInfoDto> getUserSubscriptions(Long userId, String token);
}
