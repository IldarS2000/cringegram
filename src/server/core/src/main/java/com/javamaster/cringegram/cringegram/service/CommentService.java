package com.javamaster.cringegram.cringegram.service;

import com.javamaster.cringegram.cringegram.dto.CommentDto;
import com.javamaster.cringegram.cringegram.dto.CreateCommentDto;
import com.javamaster.cringegram.cringegram.dto.UpdateCommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto> getPostComments(Long postId);

    CommentDto createComment(CreateCommentDto createCommentDto, String token);

    CommentDto updateComment(UpdateCommentDto updateCommentDto, String token);

    Void deleteComment(Long commentId, String token);
}
