package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByPhoneNumber(String phone_number);
}
