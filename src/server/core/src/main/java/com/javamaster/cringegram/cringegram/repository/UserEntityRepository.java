package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {


    boolean existsUserEntityByUsername(String username);

    boolean existsUserEntityByEmail(String email);

    boolean existsUserEntitiesById(Long id);

    UserEntity findByUsername(String username);

    UserEntity findByEmail(String email);

    Optional<UserEntity> findById(Long id);

}
