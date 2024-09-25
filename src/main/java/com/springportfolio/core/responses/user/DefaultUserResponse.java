package com.springportfolio.core.responses.user;

import com.springportfolio.core.entity.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class DefaultUserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private boolean profile;


    public static DefaultUserResponse toDefaultUserResponse(User user) {
        return DefaultUserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .profile(user.getProfile() != null)
                .build();
    }
}
