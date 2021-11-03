package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.CommentDto;
import com.javamaster.cringegram.cringegram.dto.CreateCommentDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.dto.UpdateCommentDto;
import com.javamaster.cringegram.cringegram.service.CommentService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
//    url.getPostComments = /comments/{postId}
//    url.createComment = /comments
//    url.updateComment = /comments
//    url.deleteComment = /comments

    private final CommentService commentService;

    @ApiOperation(
            value = "get post comments"
    )
    @GetMapping(path = "${url.getPostComments}")
    public List<CommentDto> getPostComments(@Valid @PathVariable("postId") Long postId) {
        return commentService.getPostComments(postId);
    }

    @ApiOperation(
            value = "create comment"
    )
    @PostMapping(path = "${url.createComment}")
    public CommentDto createComment(@Valid @RequestBody CreateCommentDto createCommentDto, @RequestHeader("Authorization") String token) {
        return commentService.createComment(createCommentDto, token);
    }

    @ApiOperation(
            value = "update comment"
    )
    @PutMapping(path = "${url.updateComment}")
    public CommentDto updateComment(@Valid @RequestBody UpdateCommentDto updateCommentDto, @RequestHeader("Authorization") String token) {
        return commentService.updateComment(updateCommentDto, token);
    }

    @ApiOperation(
            value = "delete comment"
    )
    @DeleteMapping(path = "${url.deleteComment}")
    public Void deleteComment(@Valid @RequestParam("commentId") Long commentId, @RequestHeader("Authorization") String token) {
        return commentService.deleteComment(commentId, token);
    }
}
