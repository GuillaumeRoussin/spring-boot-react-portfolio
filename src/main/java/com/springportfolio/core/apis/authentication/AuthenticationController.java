package com.springportfolio.core.apis.authentication;

import com.springportfolio.core.dtos.user.LoginUserDto;
import com.springportfolio.core.dtos.user.RegisterUserDto;
import com.springportfolio.core.entity.User;
import com.springportfolio.core.responses.LoginResponse;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import com.springportfolio.core.services.authentication.AuthenticationService;
import com.springportfolio.core.services.authentication.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<DefaultUserResponse> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        DefaultUserResponse registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = LoginResponse.builder().token(jwtToken).expiresIn(jwtService.getExpirationTime()).build();

        return ResponseEntity.ok(loginResponse);
    }
}
