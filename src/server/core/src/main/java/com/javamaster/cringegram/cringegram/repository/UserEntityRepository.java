package com.javamaster.cringegram.cringegram.repository;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    boolean existsUserEntityByUsername(String username);

    boolean existsUserEntityByEmail(String email);

    boolean existsUserEntitiesById(Long id);

    UserEntity findByUsername(String username);

    UserEntity findByEmail(String email);

    Optional<UserEntity> findById(Long id);

    @Query("FROM UserEntity u " +
            "WHERE LOWER(u.username) LIKE CONCAT('%',:searchTerm,'%') or " +
            "lower(u.aboutMe) LIKE lower(CONCAT('%',:searchTerm,'%'))")
    List<UserEntity> searchUsers(@Param("searchTerm") String searchTerm);

    @Query(value = "select count(*) from subscription s " +
            "where s.user_id=:userId and s.subscriber_id=:subscriberId", nativeQuery = true)
    Integer findSubscription(@Param("userId") Long userId, @Param("subscriberId") Long subscriberId);

    @Query(value = "select u.subscribers from UserEntity u")
    Set<UserEntity> getSubscribers(@Param("userId") Long userId);

    @Query(value = "select u.subscriptions from UserEntity u")
    Set<UserEntity> getSubscriptions(@Param("userId") Long userId);

}
