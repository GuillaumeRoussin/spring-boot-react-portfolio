package com.springportfolio.core.apis.user;

import com.springportfolio.core.entity.user.User;
import com.springportfolio.core.repository.user.UserRepositoryInterface;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import com.springportfolio.core.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final UserRepositoryInterface userRepository;

    public UserController(UserService userService, UserRepositoryInterface userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/me")
    public ResponseEntity<DefaultUserResponse> authenticatedUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails currentUserDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByEmail(currentUserDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(DefaultUserResponse.toDefaultUserResponse(currentUser));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<List<DefaultUserResponse>> allUsers() {
        List<DefaultUserResponse> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
