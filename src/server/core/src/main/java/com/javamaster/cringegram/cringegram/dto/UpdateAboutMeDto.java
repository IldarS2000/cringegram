package com.javamaster.cringegram.cringegram.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ApiModel("about me dto")
public class UpdateAboutMeDto {
    @ApiModelProperty(
            value = "aboutMe",
            name = "aboutMe",
            dataType = "String",
            example = "developer 13 y.o."
    )
    @Size(max = 64)
    private String aboutMe;
}
