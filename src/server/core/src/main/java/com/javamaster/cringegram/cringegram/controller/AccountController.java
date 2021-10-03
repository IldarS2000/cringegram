package com.javamaster.cringegram.cringegram.controller;

import com.javamaster.cringegram.cringegram.dto.UpdateAboutMeDto;
import com.javamaster.cringegram.cringegram.dto.UpdateUsernameDto;
import com.javamaster.cringegram.cringegram.dto.UserInfoDto;
import com.javamaster.cringegram.cringegram.service.AccountService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @ApiOperation(
            value = "Get user info"
    )
    @GetMapping("${url.getUserInfo}")
    public UserInfoDto getUserInfo(@RequestParam("userId") Long userId) {
        return accountService.getUserInfo(userId);
    }

    @ApiOperation(
            value = "Update username"
    )
    @PutMapping("${url.updateUsername}")
    public ResponseEntity<UserInfoDto> updateUsername(@RequestBody @Valid UpdateUsernameDto updateUsernameDto, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(accountService.updateUsername(updateUsernameDto, token));
    }

    @ApiOperation(
            value = "Update user avatar"
    )
    @RequestMapping(value = "${url.updateUserAvatar}", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserInfoDto> updateUserAvatar(@RequestPart @Valid MultipartFile image, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(accountService.updateUserAvatar(image, token));
    }

    @ApiOperation(
            value = "Update user about me"
    )
    @PutMapping("${url.updateUserAboutMe}")
    public ResponseEntity<UserInfoDto> updateUserAboutMe(@RequestBody @Valid UpdateAboutMeDto updateAboutMeDto, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(accountService.updateUserAboutMe(updateAboutMeDto, token));
    }

}
