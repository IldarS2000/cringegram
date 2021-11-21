package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostEntityRepository extends JpaRepository<PostEntity, Long> {
    @Override
    PostEntity getById(Long aLong);

    @Query(value = "select * from post", nativeQuery = true)
    List<PostEntity> getAll();

    List<PostEntity> getAllByUserId(Long userId);

    Integer removePostEntityById(Long postId);

    @Query(value = "select count(*) from comment where post_id =:postId", nativeQuery = true)
    Integer getCommentsCount(@Param("postId") Long postId);

}
