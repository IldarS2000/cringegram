package com.javamaster.cringegram.cringegram.entity;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "description")
    private String description;

    @Column(name = "like_count")
    private Integer likeCount;

    @OneToMany(mappedBy = "post")
    private Set<CommentEntity> comments;

    @ManyToMany(mappedBy = "likedPosts",cascade = CascadeType.ALL)
    private Set<UserEntity> users;
}
