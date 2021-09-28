package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.*;
import com.javamaster.cringegram.cringegram.service.AuthenticationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public UserDto signUp(@RequestBody @Valid SignUpDto signUpDto) {
        return authenticationService.sighUp(signUpDto);
    }

    @ApiOperation(
            value = "Authorization in system"
    )
    @PostMapping("${url.signin}")
    public ResponseEntity<TokenDto> signIn(@RequestBody @Valid SignInDto signInDto) {
        return ResponseEntity.ok(authenticationService.signIn(signInDto));
    }

    @GetMapping("${url.isValidToken}")
    public ResponseEntity<TokenDto> isValidToken(TokenDto oldToken) {
        return ResponseEntity.ok(authenticationService.isValidToken(oldToken));
    }
}
