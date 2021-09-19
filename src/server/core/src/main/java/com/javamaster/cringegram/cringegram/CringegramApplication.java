package com.javamaster.cringegram.cringegram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@PropertySource("classpath:url.properties")
@EnableJpaRepositories
@EnableSwagger2
public class CringegramApplication {

    public static void main(String[] args) {
        SpringApplication.run(CringegramApplication.class, args);
    }

}
