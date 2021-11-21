package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.*;

import java.util.List;

public interface PostService {
    PostDto addPost(CreatePostDto createPostDto, String token);
    PostDto updatePost(UpdatePostDto updatePostDto, String token);
    List<PostDto> getAllUserPosts(Long userId, String token);
    List<PostDto> getAllPosts(String token);
    PostDto getPostById(Long userId, String token);
    Void deletePost(Long postId, String token);
    PostDto toggleLike(Long postId, String token);
    List<UserShortInfoDto> getPostLikes(Long postId, String token);
}
