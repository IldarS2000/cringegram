package com.javamaster.cringegram.cringegram.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ApiModel("avatar dto")
public class UpdateAvatarDto {
    @ApiModelProperty(
            value = "user avatar",
            name = "user avatar",
            dataType = "File"
    )
    @NotNull
    @NotEmpty
    private MultipartFile image;
}
