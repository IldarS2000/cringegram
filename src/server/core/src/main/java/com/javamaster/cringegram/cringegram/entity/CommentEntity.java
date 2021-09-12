package com.javamaster.cringegram.cringegram.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "comment")
@Data
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostEntity post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column
    private String comment;
}
