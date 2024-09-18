package com.springportfolio.core.apis.user;

import com.springportfolio.core.dtos.user.ProfileDto;
import com.springportfolio.core.responses.user.ProfileResponse;
import com.springportfolio.core.services.user.ProfileService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@PreAuthorize("hasRole('USER')")
@RequestMapping("/profiles")
@RestController
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/")
    public ResponseEntity<ProfileResponse> register(@Valid @RequestBody ProfileDto profileDto) throws BadRequestException {
        ProfileResponse profile = profileService.createProfile(profileDto);

        return ResponseEntity.ok(profile);
    }


//    @GetMapping()
//    public ResponseEntity<List<DefaultUserResponse>> allUsers() {
//        List<DefaultUserResponse> users = userService.allUsers();
//
//        return ResponseEntity.ok(users);
//    }
}
