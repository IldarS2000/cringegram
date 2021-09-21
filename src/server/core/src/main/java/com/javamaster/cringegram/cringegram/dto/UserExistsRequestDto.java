package com.javamaster.cringegram.cringegram.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel("Form for check user email in bd")
public class UserExistsRequestDto {

    @ApiModelProperty(
            value = "Input email",
            name = "email",
            example = "example@gusenkov.com",
            dataType = "String"
    )
    @Email(message = "Incorrect email")
    @NotNull
    @NotEmpty(message = "Please provide email")
    private String email;

}
