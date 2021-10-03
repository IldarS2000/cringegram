package com.javamaster.cringegram.cringegram.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ApiModel("username dto")
public class UpdateUsernameDto {
    @ApiModelProperty(
            value = "username",
            name = "username",
            dataType = "String",
            example = "kekwmek229"
    )
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 16)
    private String username;
}
