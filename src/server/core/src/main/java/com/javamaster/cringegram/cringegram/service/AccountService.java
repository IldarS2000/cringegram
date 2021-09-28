package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.AccountDto;

public interface AccountService {
    AccountDto getAccount(String username);
}
