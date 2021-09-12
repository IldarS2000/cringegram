package com.javamaster.cringegram.cringegram.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "post")
@Data
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column
    private byte[] photo;

    @Column
    private String description;

    @Column
    private Integer like_count;

    @OneToMany(mappedBy = "post")
    private Set<CommentEntity> comments;

    @ManyToMany(mappedBy = "likedPosts")
    private Set<UserEntity> users;
}
