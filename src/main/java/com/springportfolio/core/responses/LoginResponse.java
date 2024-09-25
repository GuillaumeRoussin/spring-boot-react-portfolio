package com.springportfolio.core.responses;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@Builder
public class LoginResponse {

    private String token;

    private long expiresIn;

    private Collection<? extends GrantedAuthority> authorities;

}
