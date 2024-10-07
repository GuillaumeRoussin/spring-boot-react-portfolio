package com.springportfolio.core.services.authentication;

import com.springportfolio.core.dtos.user.RegisterUserDto;
import com.springportfolio.core.dtos.user.LoginUserDto;
import com.springportfolio.core.entity.security.Role;
import com.springportfolio.core.entity.user.User;
import com.springportfolio.core.repository.security.RoleRepositoryInterface;
import com.springportfolio.core.repository.user.UserRepositoryInterface;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import com.springportfolio.core.services.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AuthenticationService {

    private final UserRepositoryInterface userRepository;
    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final RoleRepositoryInterface roleRepository;

    public AuthenticationService(UserRepositoryInterface userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, RoleRepositoryInterface roleRepository, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    public DefaultUserResponse signup(RegisterUserDto input) {
        Optional<Role> roleUser = roleRepository.findByName("ROLE_USER");
        User user = User.builder()
                .firstName(input.getFirstName())
                .lastName(input.getLastName())
                .email(input.getEmail())
                .roles(List.of(roleUser.orElseThrow()))
                .password(passwordEncoder.encode(input.getPassword()))
                .build();

        return DefaultUserResponse.toDefaultUserResponse(userRepository.save(user));
    }

    public UserDetails authenticate(LoginUserDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

        return userService.loadUserByUsername(input.getEmail());
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails currentUserDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(currentUserDetails.getUsername()).orElseThrow();
    }
}