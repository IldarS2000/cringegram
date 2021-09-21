package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.SignUpDto;
import com.javamaster.cringegram.cringegram.dto.UserDto;
import com.javamaster.cringegram.cringegram.dto.UserExistsRequestDto;
import com.javamaster.cringegram.cringegram.dto.UserExistsResponseDto;
import com.javamaster.cringegram.cringegram.service.AuthenticationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @ApiOperation(
            value = "Check user email exists"
    )
    @PostMapping("${url.userexists}")
    public UserExistsResponseDto userExists(@RequestBody @Valid UserExistsRequestDto userExistsRequestDto) {

        return authenticationService.userExists(userExistsRequestDto);
    }

    @ApiOperation(
            value = "Creates new user. If operation is successfully then returns created user with id. Otherwise, returns custom error message"
    )
    @PostMapping("${url.signup}")
    private UserDto signUp(@RequestBody @Valid SignUpDto signUpDto) {
        return authenticationService.sighUp(signUpDto);
    }
}
