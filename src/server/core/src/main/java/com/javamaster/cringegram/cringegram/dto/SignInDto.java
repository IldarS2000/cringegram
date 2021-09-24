package com.javamaster.cringegram.cringegram.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ApiModel("Form for user sign in")
public class SignInDto {

    @ApiModelProperty(
            value = "email",
            name = "email",
            example = "email@example.com",
            dataType = "String"
    )
    private String email;

    @ApiModelProperty(
            value = "password",
            name = "password",
            example = "superpass111",
            dataType = "String"
    )
    @NotEmpty(message = "Please, enter the password")
    @NotNull
    private String password;
}

