package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.UserExistsRequestDto;
import com.javamaster.cringegram.cringegram.dto.UserExistsResponseDto;

public interface SignInService {

    UserExistsResponseDto userExists(UserExistsRequestDto userExistsRequestDto);
}
