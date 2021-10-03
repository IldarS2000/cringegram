package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;

public interface AuthenticationService {

    UserExistsResponseDto userExists(UserExistsRequestDto userExistsRequestDto);

    AuthDto signUp(SignUpDto signUpDto);

    AuthDto signIn(SignInDto signInDto);

    AuthDto isValidToken(String token);
}
