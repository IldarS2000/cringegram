package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.UpdateAboutMeDto;
import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AccountService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    @Value("${jwt.secret}")
    private String secret;

    private final UserEntityRepository userEntityRepository;

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
        UserEntity user = validateToken(token);
        user.setUsername(updateUsernameDto.getUsername());
        userEntityRepository.save(user);
        return buildingUser(user);
    }

    @Override
    public UserInfoDto updateUserAvatar(MultipartFile image, String token) {
        try {
            UserEntity user = validateToken(token);
            user.setAvatar(image.getBytes());
            userEntityRepository.save(user);
            return buildingUser(user);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        }
    }

    @Override
    public UserInfoDto updateUserAboutMe(UpdateAboutMeDto updateAboutMeDto, String token) {
        UserEntity user = validateToken(token);
        user.setAboutMe(updateAboutMeDto.getAboutMe());
        userEntityRepository.save(user);
        return buildingUser(user);
    }


    private UserInfoDto buildingUser(UserEntity user) {
        return UserInfoDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .aboutMe(user.getAboutMe())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .build();
    }

    private UserEntity validateToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String tokenValue = token.substring(7);
            Claims claims = parseToken(tokenValue, secret);
            return userEntityRepository.findByEmail(claims.get("email").toString());
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }

    private Claims parseToken(String token, String secret) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}
