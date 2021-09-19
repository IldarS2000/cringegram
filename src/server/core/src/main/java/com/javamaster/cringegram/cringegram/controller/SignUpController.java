package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.SignUpDto;
import com.javamaster.cringegram.cringegram.dto.UserDto;
import com.javamaster.cringegram.cringegram.service.SignUpService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Api("Sign up controller for users")
public class SignUpController {

    private final SignUpService signUpService;

    @ApiOperation(
            value = "Creates new user. If operation is successfully then returns created user with id. Otherwise, returns custom error message"
    )
    @PostMapping("${url.signup}")
    private UserDto signUp(@RequestBody @Valid SignUpDto signUpDto) {
        return signUpService.sighUp(signUpDto);
    }
}
