package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.*;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.UserExistException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Value("${jwt.secret}")
    private String secret;

    private final UserEntityRepository userEntityRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthDto signUp(SignUpDto signUpDto) {
        if (userEntityRepository.existsUserEntityByEmail(signUpDto.getEmail())) {
            throw new UserExistException("User with this email already exists");
        }

        UserEntity user =
                UserEntity.builder()
                        .password(passwordEncoder.encode(signUpDto.getPassword()))
                        .postCount(0)
                        .subscriptionCount(0)
                        .email(signUpDto.getEmail())
                        .build();

        userEntityRepository.save(user);
        String token = this.generateToken(user);
        return this.buildingAuthDto(user,token);
    }

    @Override
    public AuthDto signIn(SignInDto signInDto) {

        Optional<UserEntity> userOptional = Optional.ofNullable(userEntityRepository.findByEmail(signInDto.getEmail()));

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();

            if (passwordEncoder.matches(signInDto.getPassword(), user.getPassword())) {
                String token = this.generateToken(user);
                return this.buildingAuthDto(user, token);
            } else throw new AccessDeniedException("Wrong email/password");
        } else throw new AccessDeniedException("User not found");
    }

    @Override
    public AuthDto isValidToken(String token) {
        try {
            Claims claims = parseToken(token, secret);
            UserEntity user = userEntityRepository.findByEmail(claims.get("email").toString());
            String newToken = this.generateToken(user);
            return buildingAuthDto(user, newToken);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }

    @Override
    public UserExistsResponseDto userExists (UserExistsRequestDto userExistsRequestDto){
        boolean exists = userEntityRepository.existsUserEntityByEmail(userExistsRequestDto.getEmail());

        return UserExistsResponseDto.builder().
                exists(exists)
                .build();
    }

    private Claims parseToken(String token, String secret) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    private String generateToken(UserEntity user){
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("email",user.getEmail())
                .signWith(SignatureAlgorithm.HS256, secret)
                .setExpiration(date)
                .compact();
    }

    private AuthDto buildingAuthDto(UserEntity user, String token) {
        return AuthDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .aboutMe(user.getAboutMe())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .email(user.getEmail())
                .token(token)
                .build();
    }
}
