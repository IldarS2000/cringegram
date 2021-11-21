package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.dto.UpdatePostDto;
import com.javamaster.cringegram.cringegram.dto.UserShortInfoDto;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.PostEntityRepository;
import com.javamaster.cringegram.cringegram.service.JwtService;
import com.javamaster.cringegram.cringegram.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
        UserEntity user = jwtService.claimTokenPayload(token);
        PostEntity post = postEntityRepository.getById(updatePostDto.getId());
        post.setDescription(updatePostDto.getDescription());
        post = postEntityRepository.save(post);
        PostDto postDto = buildPostDto(post);
        postDto.setHasYourLike(post.getUsersLiked().contains(user));
        return postDto;
    }

    @Override
    public List<PostDto> getAllUserPosts(Long userId, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        return postEntityRepository.getAllByUserId(userId).stream()
                .map(postEntity -> {
                    PostDto postDto = buildPostDto(postEntity);
                    postDto.setHasYourLike(postEntity.getUsersLiked().contains(user));
                    return postDto;
                })
                .collect(Collectors.toList());
    }

    public List<PostDto> getAllPosts(String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        return postEntityRepository.getAll().stream()
                .map(postEntity -> {
                    PostDto postDto = buildPostDto(postEntity);
                    postDto.setHasYourLike(postEntity.getUsersLiked().contains(user));
                    return postDto;
                })
                .collect(Collectors.toList());

    }

    @Override
    public PostDto getPostById(Long postId, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        PostEntity post = postEntityRepository.getById(postId);

        PostDto postDto = buildPostDto(post);
        postDto.setHasYourLike(post.getUsersLiked().contains(user));

        return postDto;
    }

    @Override
    @Transactional
    public Void deletePost(Long postId, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        PostEntity post = postEntityRepository.getById(postId);
        post.getUsersLiked().clear();
        user.getPosts().remove(post);
        postEntityRepository.removePostEntityById(postId);
        return null;
    }

    @Override
    public PostDto toggleLike(Long postId, String token) {
        UserEntity user = jwtService.claimTokenPayload(token);
        PostEntity post = postEntityRepository.getById(postId);

        PostDto postDto;
        if (post.getUsersLiked().contains(user)) {
            post.getUsersLiked().remove(user);
            post.setLikeCount(post.getLikeCount() - 1);
            postDto = buildPostDto(postEntityRepository.save(post));
            postDto.setHasYourLike(false);
        } else {
            post.getUsersLiked().add(user);
            post.setLikeCount(post.getLikeCount() + 1);
            postDto = buildPostDto(postEntityRepository.save(post));
            postDto.setHasYourLike(true);
        }
        return postDto;
    }

    @Override
    public List<UserShortInfoDto> getPostLikes(Long postId, String token) {
        PostEntity post = postEntityRepository.getById(postId);
        List<UserEntity> usersLiked = post.getUsersLiked();
        return usersLiked.stream().map(user -> UserShortInfoDto.builder()
                .aboutMe(user.getAboutMe())
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build()).collect(Collectors.toList());
    }

    private PostDto buildPostDto(PostEntity post) {
        Integer commentsCount = postEntityRepository.getCommentsCount(post.getId());
        return PostDto.builder()
                .id(post.getId())
                .createTimestamp(post.getCreateTimestamp())
                .userId(post.getUser().getId())
                .photo(post.getPhoto())
                .description(post.getDescription())
                .likeCount(post.getLikeCount())
                .commentsCount(commentsCount)
                .build();
    }

    private List<PostDto> buildPostDtos(List<PostEntity> postEntities) {
        return postEntities.stream().map(this::buildPostDto).collect(Collectors.toList());
    }
}
