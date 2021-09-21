package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.UserExistsRequestDto;
import com.javamaster.cringegram.cringegram.dto.UserExistsResponseDto;
import com.javamaster.cringegram.cringegram.service.SignInService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class SignInController {

    private final SignInService signInService;

    @ApiOperation(
            value = "Check user email exists"
    )
    @PostMapping("$(url.userExists)")
    public UserExistsResponseDto userExists(@RequestBody @Valid UserExistsRequestDto userExistsRequestDto) {

        return signInService.userExists(userExistsRequestDto);
    }




}
