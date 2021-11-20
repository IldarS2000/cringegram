package com.javamaster.cringegram.cringegram.entity.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.javamaster.cringegram.cringegram.entity.CommentEntity;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import lombok.*;
import org.apache.catalina.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = { "id" })
public class UserEntity implements Serializable {
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
        joinColumns = @JoinColumn(name = "subscriber_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private Set<UserEntity> subscriptions = new HashSet<UserEntity>(0);

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "subscription",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subscriber_id")
    )
    @JsonIgnore
    private Set<UserEntity> subscribers = new HashSet<UserEntity>(0);

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "like",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<PostEntity> likedPosts;

}
