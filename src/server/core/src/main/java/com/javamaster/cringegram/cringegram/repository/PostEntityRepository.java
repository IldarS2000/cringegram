package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostEntityRepository extends JpaRepository<PostEntity, Long> {
    @Override
    PostEntity getById(Long aLong);

    List<PostEntity> getAllByUserId(Long userId);
}
