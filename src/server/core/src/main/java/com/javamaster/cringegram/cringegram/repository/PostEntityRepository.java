package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostEntityRepository extends JpaRepository<PostEntity, Long> {

}
