package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.AccountDto;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.NotFoundException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final UserEntityRepository userEntityRepository;

    @Override
    public AccountDto getAccount(String username) {
        if (!userEntityRepository.existsUserEntityByUsername(username)) {
            throw new NotFoundException(AccountDto.class,"not found account");
        }

        UserEntity user = userEntityRepository.findByUsername(username);

        AccountDto account = AccountDto.builder()
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .aboutMe(user.getAboutMe())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .build();
        return account;
    }
}
