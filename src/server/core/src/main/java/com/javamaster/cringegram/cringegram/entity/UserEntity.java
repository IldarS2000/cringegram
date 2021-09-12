package com.javamaster.cringegram.cringegram.entity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.nio.file.LinkOption;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String phone_number;

    @Column
    private String name;

    @Column
    private byte[] avatar;

    @Column
    private String about_me;

    @Column
    private Integer post_count;

    @Column
    private Integer subscription_count;

    @Column
    private String access_token;

    @Column
    private String refresh_token;

    @OneToMany(mappedBy = "user")
    private Set<PostEntity> posts;

    @OneToMany(mappedBy = "user")
    private Set<CommentEntity> comments;

    @ManyToMany(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    @JoinTable(name = "subscription",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "subscriber_id")
    )
    private Set<UserEntity> users;

    @ManyToMany(mappedBy = "users")
    private Set<UserEntity> subscribers;

    @ManyToMany(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    @JoinTable(name = "like",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<PostEntity> likedPosts;

}
