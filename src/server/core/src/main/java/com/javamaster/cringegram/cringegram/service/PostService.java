package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.dto.UpdatePostDto;

import java.util.List;

public interface PostService {
    PostDto addPost(CreatePostDto createPostDto, String token);
    PostDto updatePost(UpdatePostDto updatePostDto, String token);
    List<PostDto> getAllUserPosts(Long userId, String token);
    PostDto getPostById(Long userId, String token);
    Void deletePost(Long postId, String token);
}
