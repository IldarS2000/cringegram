package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.*;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.UserExistException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AuthenticationService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Value("${jwt.secret}")
    private String secret;

    private final UserEntityRepository userEntityRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto sighUp(SignUpDto signUpDto) {
        if (userEntityRepository.existsUserEntityByUsername(signUpDto.getUsername())) {
            throw new UserExistException("User with this username already exists");
        }
        if (userEntityRepository.existsUserEntityByPhone(signUpDto.getPhone())) {
            throw new UserExistException("User with this phone number already exists");
        }

        UserEntity user =
                UserEntity.builder()
                        .username(signUpDto.getUsername())
                        .aboutMe(signUpDto.getAboutMe())
                        .password(passwordEncoder.encode(signUpDto.getPassword()))
                        .phone(signUpDto.getPhone())
                        .postCount(0)
                        .subscriptionCount(0)
                        .email(signUpDto.getEmail())
                        .build();

        userEntityRepository.save(user);
        return UserDto.builder()
                .username(user.getUsername())
                .aboutMe(user.getAboutMe())
                .phone(user.getPhone())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .email(user.getEmail())
                .build();
    }

    @Override
    public TokenDto signIn(SignInDto signInDto) {

        Optional<UserEntity> userOptional = Optional.ofNullable(userEntityRepository.findByEmail(signInDto.getEmail()));

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();

            if (passwordEncoder.matches(signInDto.getPassword(), user.getPassword())) {
                String token =
                        Jwts.builder()
                                .setSubject(user.getId().toString())
                                .claim("username",user.getUsername())
                                .signWith(SignatureAlgorithm.HS256, secret)
                                .compact();
                return new TokenDto(token);
            } else throw new AccessDeniedException("Wrong email/password");
        } else throw new AccessDeniedException("User not found");
    }

    @Override
        public UserExistsResponseDto userExists (UserExistsRequestDto userExistsRequestDto){
            boolean exists = userEntityRepository.existsUserEntityByEmail(userExistsRequestDto.getEmail());

            return UserExistsResponseDto.builder().
                    exists(exists)
                    .build();
        }
}
