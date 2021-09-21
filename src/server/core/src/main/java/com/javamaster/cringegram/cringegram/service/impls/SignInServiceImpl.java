package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.UserExistsRequestDto;
import com.javamaster.cringegram.cringegram.dto.UserExistsResponseDto;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignInServiceImpl implements SignInService {

    private final UserEntityRepository userEntityRepository;

    //private final PasswordEncoder passwordEncoder;

    @Override
    public UserExistsResponseDto userExists(UserExistsRequestDto userExistsRequestDto) {
        boolean exists = userEntityRepository.existsUserEntityByEmail(userExistsRequestDto.getEmail());

        return UserExistsResponseDto.builder().
                exists(exists)
                .build();
    }
}
