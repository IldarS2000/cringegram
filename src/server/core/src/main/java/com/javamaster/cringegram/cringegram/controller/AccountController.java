package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.AccountDto;
import com.javamaster.cringegram.cringegram.service.AccountService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @ApiOperation(
            value = "Get account"
    )
    @GetMapping("${url.getAccount}")
    public AccountDto getAccount(String username) {

        return accountService.getAccount(username);
    }

}
