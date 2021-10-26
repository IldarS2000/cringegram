package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;

public interface PostService {
    PostDto addPost(CreatePostDto createPostDto, String token);
}
