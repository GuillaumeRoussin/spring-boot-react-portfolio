package com.springportfolio.core.responses.user;

import com.springportfolio.core.entity.user.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
@Builder
public class MeUserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean profile;
    private Collection<? extends GrantedAuthority> authorities;

    public static MeUserResponse fromEntity(User user, Collection<? extends GrantedAuthority> authorities) {
        return MeUserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .profile(user.getProfile() != null)
                .authorities(authorities)
                .build();
    }
}
