package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.service.PostService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @ApiOperation(
            value = "create user post"
    )
    @RequestMapping(path = "${url.createPost}", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<PostDto> addPost(@Valid @ModelAttribute CreatePostDto createPostDto, @RequestHeader("Authorization") String token) {
        System.out.println(createPostDto);
        return ResponseEntity.ok(postService.addPost(createPostDto, token));
    }
}
