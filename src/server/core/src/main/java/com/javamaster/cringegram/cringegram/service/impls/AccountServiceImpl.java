package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.UpdateAboutMeDto;
import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
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
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final UserEntityRepository userEntityRepository;
    private final JwtService jwtService;

    @Override
    public UserInfoDto getUserInfo(Long userId) {
        if (!userEntityRepository.existsUserEntitiesById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(userId);

        if (userEntityOptional.isPresent()) {
            UserEntity user = userEntityOptional.get();
            return buildingUser(user);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this id not found");
    }

    @Override
    public UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        user.setUsername(updateUsernameDto.getUsername());
        userEntityRepository.save(user);
        return buildingUser(user);
    }

    @Override
    public UserInfoDto updateUserAvatar(MultipartFile image, String token) {
        try {
            UserEntity user = jwtService.claimTokenPayload(token);
            user.setAvatar(image.getBytes());
            userEntityRepository.save(user);
            return buildingUser(user);
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
        return buildingUser(user);
    }

    @Override
    public byte[] getUserAvatar(Long userId) {
        UserEntity user = userEntityRepository.getById(userId);
        return user.getAvatar();
    }

    @Override
    public UserInfoDto changeSubscription(Long userId, String token) {
        UserEntity subscriber = jwtService.claimTokenPayload(token);
        UserEntity user = userEntityRepository.getById(userId);

        Set<UserEntity> subscribers = user.getSubscribers();

        if (subscribers.contains(subscriber)) {
            subscribers.remove(subscriber);
        } else {
            subscribers.add(subscriber);
        }
        return buildingUser(userEntityRepository.save(user));
    }


    private UserInfoDto buildingUser(UserEntity user) {
        return UserInfoDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .aboutMe(user.getAboutMe())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .subscribersCount(user.getSubscriberCount())
                .build();
    }

}
