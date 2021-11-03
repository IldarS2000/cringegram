package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.dto.UpdatePostDto;
import com.javamaster.cringegram.cringegram.service.PostService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @ApiOperation(
            value = "get all user posts"
    )
    @GetMapping(path = "${url.getAllUserPosts}")
    public List<PostDto> getAllUserPosts(@Valid @PathVariable("userId") Long userId, @RequestHeader("Authorization") String token) {
        return postService.getAllUserPosts(userId, token);
    }

    @ApiOperation(
            value = "get all posts"
    )
    @GetMapping(path = "${url.getAllPosts}")
    public List<PostDto> getAllPosts( @RequestHeader("Authorization") String token) {
        return postService.getAllPosts(token);
    }

    @ApiOperation(
            value = "get post by user id"
    )
    @GetMapping(path = "${url.getPostById}")
    public PostDto getPostById(@Valid @RequestParam Long postId, @RequestHeader("Authorization") String token) {
        return postService.getPostById(postId, token);
    }

    @ApiOperation(
            value = "create user post"
    )
    @RequestMapping(path = "${url.createPost}", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<PostDto> addPost(@Valid @ModelAttribute CreatePostDto createPostDto, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(postService.addPost(createPostDto, token));
    }

    @ApiOperation(
            value = "update user post"
    )
    @RequestMapping(path = "${url.updatePost}", method = PUT, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<PostDto> updatePost(@Valid @ModelAttribute UpdatePostDto updatePostDto, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(postService.updatePost(updatePostDto, token));
    }

    @ApiOperation(
            value = "delete user post"
    )
    @RequestMapping(path = "${url.deletePost}", method = DELETE, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> deletePost(@Valid @RequestParam("postId") Long postId, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(postService.deletePost(postId, token));
    }
}
