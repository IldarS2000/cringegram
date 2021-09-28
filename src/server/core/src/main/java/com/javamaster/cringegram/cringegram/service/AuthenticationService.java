package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;
import org.springframework.transaction.reactive.TransactionalOperatorExtensionsKt;

public interface AuthenticationService {

    UserExistsResponseDto userExists(UserExistsRequestDto userExistsRequestDto);

    UserDto sighUp(SignUpDto signUpDto);

    TokenDto signIn(SignInDto signInDto);

    TokenDto isValidToken(TokenDto tokenDto);
}
