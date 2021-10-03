package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import com.javamaster.cringegram.cringegram.service.AccountService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @ApiOperation(
            value = "Get user info"
    )
    @GetMapping("${url.getUserInfo}")
    public UserInfoDto getUserInfo(@RequestParam("userId") Long userId) {
        return accountService.getUserInfo(userId);
    }

}
