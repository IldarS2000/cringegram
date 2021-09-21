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
            value = "username",
            name = "username",
            dataType = "String",
            example = "username"
    )
    @NotNull
    @NotEmpty(message = "Please, provide a username")
    private String username;

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

    @Pattern(regexp = "(^$|[0-9]{10})")
    @NotNull
    @NotEmpty(message = "Please, provide a phone")
    @ApiModelProperty(
            value = "phone number",
            name = "phone",
            dataType = "String",
            example = "8005553535"
    )
    private String phone;

    @ApiModelProperty(
            value = "about me info",
            name = "aboutMe",
            dataType = "String"
    )
    private String aboutMe;

    @ApiModelProperty(
            value = "email",
            name = "email",
            dataType = "String",
            example = "example@email.com"
    )
    @NotNull
    @NotEmpty(message = "Please, provide your email")
    @Email
    private String email;
}

