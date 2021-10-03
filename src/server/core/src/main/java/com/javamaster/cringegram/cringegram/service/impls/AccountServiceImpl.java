package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.NotFoundException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AccountService;
import javassist.tools.web.BadHttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final UserEntityRepository userEntityRepository;

    @Override
    public UserInfoDto getUserInfo(Long userId) {
        if (!userEntityRepository.existsUserEntitiesById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(userId);

        if (userEntityOptional.isPresent()){
            UserEntity user = userEntityOptional.get();
            return UserInfoDto.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .avatar(user.getAvatar())
                    .aboutMe(user.getAboutMe())
                    .postCount(user.getPostCount())
                    .subscriptionCount(user.getSubscriptionCount())
                    .build();
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this id not found");
    }
}
