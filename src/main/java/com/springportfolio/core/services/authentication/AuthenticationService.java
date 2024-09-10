package com.springportfolio.core.services.authentication;

import com.springportfolio.core.dtos.user.RegisterUserDto;
import com.springportfolio.core.dtos.user.LoginUserDto;
import com.springportfolio.core.entity.Role;
import com.springportfolio.core.entity.User;
import com.springportfolio.core.repository.RoleRepositoryInterface;
import com.springportfolio.core.repository.UserRepositoryInterface;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AuthenticationService {

    private final UserRepositoryInterface userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepositoryInterface roleRepository;

    public AuthenticationService(UserRepositoryInterface userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, RoleRepositoryInterface roleRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public User signup(RegisterUserDto input) {
        Optional<Role> roleUser = roleRepository.findByName("ROLE_USER");
        User user = User.builder().firstName(input.getFirstName()).lastName(input.getLastName()).email(input.getEmail()).roles(List.of(roleUser.orElseThrow())).password(passwordEncoder.encode(input.getPassword())).build();

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }
}