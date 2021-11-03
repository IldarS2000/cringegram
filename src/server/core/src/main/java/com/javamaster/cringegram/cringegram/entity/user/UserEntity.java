package com.javamaster.cringegram.cringegram.entity.user;

import com.javamaster.cringegram.cringegram.entity.CommentEntity;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "password")
    private String password;

    @Column(name = "about_me")
    private String aboutMe;

    @Column(name = "post_count")
    private Integer postCount;

    @Column(name = "subscription_count")
    private Integer subscriptionCount;

    @Column(name = "subscriber_count")
    private Integer subscriberCount;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<PostEntity> posts;

    @OneToMany(mappedBy = "user")
    private Set<CommentEntity> comments;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "subscription",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "subscriber_id")
    )
    private Set<UserEntity> users;

    @ManyToMany(mappedBy = "users")
    private Set<UserEntity> subscribers;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "like",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<PostEntity> likedPosts;

}
