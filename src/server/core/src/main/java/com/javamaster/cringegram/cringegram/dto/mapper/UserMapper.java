//package com.javamaster.cringegram.cringegram.dto.mapper;
//
//import com.javamaster.cringegram.cringegram.dto.UserDto;
//import com.javamaster.cringegram.cringegram.entity.user.UserEntity;
//import org.mapstruct.InheritInverseConfiguration;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//
//import java.util.List;
//
//@Mapper(componentModel = "spring")
//public interface UserMapper {
//
//    UserEntity map(UserDto userDto);
//
//    List<UserEntity> mapList(List<UserDto> userDtos);
//
//    @InheritInverseConfiguration
//    UserDto mapToDto(UserEntity userEntity);
//
//    @InheritInverseConfiguration
//    List<UserDto> mapListDto(List<UserEntity> userEntities);
//}
