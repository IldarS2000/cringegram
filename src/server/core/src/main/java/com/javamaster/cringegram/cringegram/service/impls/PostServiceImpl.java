package com.javamaster.cringegram.cringegram.service.impls;

import com.javamaster.cringegram.cringegram.dto.CreatePostDto;
import com.javamaster.cringegram.cringegram.dto.PostDto;
import com.javamaster.cringegram.cringegram.entity.PostEntity;
import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
import com.javamaster.cringegram.cringegram.repository.PostEntityRepository;
import com.javamaster.cringegram.cringegram.service.JwtService;
import com.javamaster.cringegram.cringegram.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Date;

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
}
