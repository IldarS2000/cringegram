package com.javamaster.cringegram.cringegram.entity;

import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = UserEntity.class)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "create_timestamp")
    private Date createTimestamp;

    @Column(name = "description")
    private String description;

    @Column(name = "like_count")
    private Integer likeCount;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    private Set<CommentEntity> comments = new HashSet<CommentEntity>(0);

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "like",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> usersLiked = new HashSet<UserEntity>(0);
}
