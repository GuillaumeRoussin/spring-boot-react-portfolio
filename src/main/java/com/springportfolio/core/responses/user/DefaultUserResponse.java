package com.springportfolio.core.responses.user;

import com.springportfolio.core.entity.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DefaultUserResponse {

    private String firstName;
    private String lastName;
    private String email;
    private Date createdAt;
    private Date updatedAt;

    public static DefaultUserResponse toDefaultUserResponse(User user) {
        return DefaultUserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
