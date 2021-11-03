package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.CommentDto;
import com.javamaster.cringegram.cringegram.dto.CreateCommentDto;
import com.javamaster.cringegram.cringegram.dto.UpdateCommentDto;
import com.javamaster.cringegram.cringegram.entity.CommentEntity;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.CommentEntityRepository;
import com.javamaster.cringegram.cringegram.repository.PostEntityRepository;
import com.javamaster.cringegram.cringegram.service.CommentService;
import com.javamaster.cringegram.cringegram.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentEntityRepository commentEntityRepository;
    private final PostEntityRepository postEntityRepository;
    private final JwtService jwtService;

    @Override
    public List<CommentDto> getPostComments(Long postId) {
        List<CommentEntity> comments = commentEntityRepository.getByPostId(postId);
        return buildCommentDtos(comments);
    }

    @Override
    public CommentDto createComment(CreateCommentDto createCommentDto, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        PostEntity post = postEntityRepository.getById(createCommentDto.getPostId());
        CommentEntity comment = CommentEntity.builder()
                .comment(createCommentDto.getComment())
                .user(user)
                .post(post)
                .build();
        comment = commentEntityRepository.save(comment);
        return buildCommentDto(comment);
    }

    @Override
    public CommentDto updateComment(UpdateCommentDto updateCommentDto, String token) {
        CommentEntity comment = commentEntityRepository.getById(updateCommentDto.getId());
        comment.setComment(updateCommentDto.getComment());
        comment = commentEntityRepository.save(comment);
        return buildCommentDto(comment);
    }

    @Override
    public Void deleteComment(Long commentId, String token) {
        jwtService.isValidToken(token);
        CommentEntity comment = commentEntityRepository.getById(commentId);
        commentEntityRepository.delete(comment);
        return null;
    }

    private CommentDto buildCommentDto(CommentEntity comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .postId(comment.getPost().getId())
                .comment(comment.getComment())
                .build();
    }

    private List<CommentDto> buildCommentDtos(List<CommentEntity> comments) {
        return comments.stream().map(this::buildCommentDto).collect(Collectors.toList());
    }
}
