package com.javamaster.cringegram.cringegram.service.impls;


import com.javamaster.cringegram.cringegram.dto.SignUpDto;
import com.javamaster.cringegram.cringegram.dto.UserDto;
//import com.javamaster.cringegram.cringegram.dto.mapper.UserMapper;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.exception.UserExistException;
import com.javamaster.cringegram.cringegram.repository.UserEntityRepository;
import com.javamaster.cringegram.cringegram.service.SignUpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignUpServiceImpl implements SignUpService {

    private final UserEntityRepository userEntityRepository;

    private final PasswordEncoder passwordEncoder;

    //private final UserMapper userMapper;

    @Override
    public UserDto sighUp(SignUpDto signUpDto) {
        if (userEntityRepository.existsUserEntityByUsername(signUpDto.getUsername())) {
            throw new UserExistException("User with this username already exists");
        }
        if (userEntityRepository.existsUserEntityByPhone(signUpDto.getPhone())) {
            throw new UserExistException("User with this phone number already exists");
        }

        UserEntity user =
                UserEntity.builder()
                        .username(signUpDto.getUsername())
                        .aboutMe(signUpDto.getAboutMe())
                        .password(passwordEncoder.encode(signUpDto.getPassword()))
                        .phone(signUpDto.getPhone())
                        .postCount(0)
                        .subscriptionCount(0)
                        .email(signUpDto.getEmail())
                        .build();

        userEntityRepository.save(user);
        return UserDto.builder()
                .username(user.getUsername())
                .aboutMe(user.getAboutMe())
                .phone(user.getPhone())
                .postCount(user.getPostCount())
                .subscriptionCount(user.getSubscriptionCount())
                .email(user.getEmail())
                .build();
        //return userMapper.mapToDto(userEntityRepository.save(user));
    }

}
