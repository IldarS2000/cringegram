package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import io.jsonwebtoken.Claims;

public interface JwtService {
    public UserEntity claimTokenPayload(String token);

    public Claims parseToken(String token, String secret);

    public String generateToken(UserEntity user);

}
