package com.javamaster.cringegram.cringegram.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.*;


@AllArgsConstructor
@Data
@Builder
@ApiModel("Form for user sign up")
public class SignUpDto {
    @ApiModelProperty(
            value = "password",
            name = "password",
            dataType = "String",
            example = "superpassword123!"
    )
    @NotNull
    @NotEmpty(message = "please enter password")
    @Size(min = 6, max = 30)
    private String password;

    @ApiModelProperty(
            value = "email",
            name = "email",
            dataType = "String",
            example = "example@gusenkov.com"
    )
    @NotNull
    @NotEmpty(message = "Please, provide your email")
    @Email
    private String email;
}

