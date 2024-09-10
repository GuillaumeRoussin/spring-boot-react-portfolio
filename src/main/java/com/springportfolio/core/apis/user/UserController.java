package com.springportfolio.core.apis.user;

import com.springportfolio.core.entity.User;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import com.springportfolio.core.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<DefaultUserResponse> authenticatedUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(DefaultUserResponse.toDefaultUserResponse(currentUser));
    }

    @GetMapping()
    public ResponseEntity<List<DefaultUserResponse>> allUsers() {
        List<DefaultUserResponse> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
