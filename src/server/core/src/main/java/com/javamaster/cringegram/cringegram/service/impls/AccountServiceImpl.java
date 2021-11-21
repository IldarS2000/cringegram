package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.*;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AccountService;
import com.javamaster.cringegram.cringegram.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final UserEntityRepository userEntityRepository;
    private final JwtService jwtService;

    @Override
    public UserInfoDto getUserInfo(Long userId, String token) {
        if (!userEntityRepository.existsUserEntitiesById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(userId);

        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            UserEntity claims = jwtService.claimTokenPayload(token);
            Boolean hasSubscription = getSubscribeInfo(userEntity.getId(), claims.getId());
            return buildingUser(userEntity, hasSubscription);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this id not found");
    }

    @Override
    public UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        user.setUsername(updateUsernameDto.getUsername());
        userEntityRepository.save(user);
        return buildingUser(user, false);
    }

    @Override
    public UserInfoDto updateUserAvatar(MultipartFile image, String token) {
        try {
            UserEntity user = jwtService.claimTokenPayload(token);
            user.setAvatar(image.getBytes());
            userEntityRepository.save(user);
            return buildingUser(user, false);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public Void deleteUserAvatar(String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        user.setAvatar(null);
        userEntityRepository.save(user);
        return null;
    }

    @Override
    public UserInfoDto updateUserAboutMe(UpdateAboutMeDto updateAboutMeDto, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        user.setAboutMe(updateAboutMeDto.getAboutMe());
        userEntityRepository.save(user);
        return buildingUser(user, false);
    }

    @Override
    public UserAvatarDto getUserAvatar(Long userId) {
        UserEntity user = userEntityRepository.getById(userId);
        return UserAvatarDto.builder()
                .base64(user.getAvatar())
                .build();
    }

    @Override
    public UserInfoDto changeSubscription(Long userId, String token) {
        UserEntity subscriber = jwtService.claimTokenPayload(token);
        UserEntity user = userEntityRepository.getById(userId);

        List<UserEntity> subscribers = user.getSubscribers();

        if (subscribers.contains(subscriber)) {
            subscribers.remove(subscriber);
            user.setSubscriberCount(user.getSubscriberCount() - 1);
            subscriber.setSubscriptionCount(subscriber.getSubscriptionCount() - 1);
            return buildingUser(userEntityRepository.save(user), false);
        } else {
            subscribers.add(subscriber);
            user.setSubscriberCount(user.getSubscriberCount() + 1);
            subscriber.setSubscriptionCount(subscriber.getSubscriptionCount() + 1);
            return buildingUser(userEntityRepository.save(user), true);
        }
    }

    @Override
    public UserShortInfoDto getUserShortInfo(Long userId) {
        if (!userEntityRepository.existsUserEntitiesById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(userId);

        if (userEntityOptional.isPresent()) {
            UserEntity user = userEntityOptional.get();
            return UserShortInfoDto.builder()
                    .username(user.getUsername())
                    .id(user.getId())
                    .avatar(user.getAvatar())
                    .aboutMe(user.getAboutMe())
                    .build();
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this id not found");
    }

    @Override
    public List<UserShortInfoDto> searchUsers(String searchTerm, String token) {
        if (Objects.equals(searchTerm, "")) {
            return new ArrayList<UserShortInfoDto>();
        }
        UserEntity user = jwtService.claimTokenPayload(token);
        List<UserEntity> users = userEntityRepository.searchUsers(searchTerm);

        return users.stream()
                .filter(searchedUser -> !Objects.equals(user.getId(), searchedUser.getId()))
                .map(this::buildingUserShortInfo)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserShortInfoDto> getUserSubscribers(Long userId, String token) {
        jwtService.isValidToken(token);
        UserEntity user = userEntityRepository.getById(userId);
        return user.getSubscribers().stream().map(this::buildingUserShortInfo).collect(Collectors.toList());
    }

    @Override
    public List<UserShortInfoDto> getUserSubscriptions(Long userId, String token) {
        jwtService.isValidToken(token);
        UserEntity user = userEntityRepository.getById(userId);
        return user.getSubscriptions().stream().map(this::buildingUserShortInfo).collect(Collectors.toList());
    }

    private UserShortInfoDto buildingUserShortInfo(UserEntity user) {
        return UserShortInfoDto.builder()
                .avatar(user.getAvatar())
                .id(user.getId())
                .username(user.getUsername())
                .aboutMe(user.getAboutMe())
                .build();
    }

    private UserInfoDto buildingUser(UserEntity user, Boolean hasSubscription) {
        return UserInfoDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .aboutMe(user.getAboutMe())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .subscribersCount(user.getSubscriberCount())
                .hasSubscription(hasSubscription)
                .build();
    }

    private Boolean getSubscribeInfo(Long userId, Long subscriberId) {
        Integer subscription = userEntityRepository.findSubscription(userId, subscriberId);
        return subscription != 0;
    }
}
