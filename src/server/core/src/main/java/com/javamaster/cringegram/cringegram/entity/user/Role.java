package com.javamaster.cringegram.cringegram.entity.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

@ApiModel
public enum Role {
    @JsonProperty("user")
    USER,
    @JsonProperty("admin")
    ADMIN
}
