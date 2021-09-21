package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;

public interface AuthenticationService {

    UserExistsResponseDto userExists(UserExistsRequestDto userExistsRequestDto);

    UserDto sighUp(SignUpDto signUpDto);
}
