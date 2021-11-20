package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.dto.UpdatePostDto;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.PostEntityRepository;
import com.javamaster.cringegram.cringegram.service.JwtService;
import com.javamaster.cringegram.cringegram.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final JwtService jwtService;
    private final PostEntityRepository postEntityRepository;

    @Override
    public PostDto addPost(CreatePostDto createPostDto, String token) {
        try {
            UserEntity user = jwtService.claimTokenPayload(token);
            PostEntity post = PostEntity.builder()
                    .photo(createPostDto.getPhoto().getBytes())
                    .user(user)
                    .createTimestamp(new Date())
                    .likeCount(0)
                    .description(createPostDto.getDescription())
                    .build();
            postEntityRepository.save(post);
            return buildPostDto(post);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        }
    }

    @Override
    public PostDto updatePost(UpdatePostDto updatePostDto, String token) {
        try {
            jwtService.isValidToken(token);
            PostEntity post = postEntityRepository.getById(updatePostDto.getId());
            post.setPhoto(updatePostDto.getPhoto().getBytes());
            post.setDescription(updatePostDto.getDescription());
            post = postEntityRepository.save(post);
            return buildPostDto(post);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        }
    }

    @Override
    public List<PostDto> getAllUserPosts(Long userId, String token) {
        jwtService.isValidToken(token);
        List<PostEntity> posts = postEntityRepository.getAllByUserId(userId);

        return buildPostDtos(posts);
    }

    public List<PostDto> getAllPosts(String token) {
        jwtService.isValidToken(token);
        List<PostEntity> posts = postEntityRepository.getAll();

        return buildPostDtos(posts);
    }

    @Override
    public PostDto getPostById(Long postId, String token) {
        jwtService.isValidToken(token);
        PostEntity post = postEntityRepository.getById(postId);

        return buildPostDto(post);
    }

    @Override
    public Void deletePost(Long postId, String token) {
        boolean isValidToken = jwtService.isValidToken(token);
        if (!isValidToken) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        }
        //postEntityRepository.deleteById(postId);
        postEntityRepository.myDeletePostById(postId);
        return null;
    }


    private PostDto buildPostDto(PostEntity post) {
        return PostDto.builder()
                .id(post.getId())
                .createTimestamp(post.getCreateTimestamp())
                .userId(post.getUser().getId())
                .photo(post.getPhoto())
                .description(post.getDescription())
                .likeCount(post.getLikeCount())
                .build();
    }

    private List<PostDto> buildPostDtos(List<PostEntity> postEntities) {
        return postEntities.stream().map(this::buildPostDto).collect(Collectors.toList());
    }
}
