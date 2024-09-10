package com.springportfolio.core.responses.user;

import com.springportfolio.core.entity.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

@Data
@Builder
public class DefaultUserResponse {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private boolean enabled;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private Collection<? extends GrantedAuthority> authorities;

    public static DefaultUserResponse toDefaultUserResponse(User user) {
        return DefaultUserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .enabled(user.isEnabled())
                .accountNonExpired(user.isAccountNonExpired())
                .accountNonLocked(user.isAccountNonLocked())
                .credentialsNonExpired(user.isCredentialsNonExpired())
                .authorities(user.getAuthorities())
                .build();
    }
}
