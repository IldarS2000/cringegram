package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.NotFoundException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AccountService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import javassist.tools.web.BadHttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

        if (userEntityOptional.isPresent()){
            UserEntity user = userEntityOptional.get();
            return buildingUser(user);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this id not found");
    }

    @Override
    public UserInfoDto updateUsername(UpdateUsernameDto updateUsernameDto, String token) {
        String tokenValue;
        if (token != null && token.startsWith("Bearer ")) {
            tokenValue = token.substring(7);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Claims claims = parseToken(tokenValue, secret);
        UserEntity user = userEntityRepository.findByEmail(claims.get("email").toString());
        user.setUsername(updateUsernameDto.getUsername());

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

    private Claims parseToken(String token, String secret) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}
