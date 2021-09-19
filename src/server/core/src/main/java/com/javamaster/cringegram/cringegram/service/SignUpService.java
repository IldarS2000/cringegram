package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.SignUpDto;
import com.javamaster.cringegram.cringegram.dto.UserDto;

public interface SignUpService {

    UserDto sighUp(SignUpDto signUpDto);
}
