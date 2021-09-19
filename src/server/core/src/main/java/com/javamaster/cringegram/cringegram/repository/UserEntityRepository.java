package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByPhone(String phoneNumber);

    boolean existsUserEntityByUsername(String username);

    boolean existsUserEntityByPhone(String phoneNumber);
}
