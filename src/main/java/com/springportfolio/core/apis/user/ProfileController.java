package com.springportfolio.core.apis.user;

import com.springportfolio.core.dtos.user.ProfileDto;
import com.springportfolio.core.responses.user.ProfileResponse;
import com.springportfolio.core.services.user.ProfileServiceImpl;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@PreAuthorize("hasRole('USER')")
@RequestMapping("/profiles")
@RestController
public class ProfileController {
    private final ProfileServiceImpl profileService;

    public ProfileController(ProfileServiceImpl profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/me")
    public ResponseEntity<ProfileResponse> createProfile(@Valid @RequestBody ProfileDto profileDto) throws BadRequestException {
        ProfileResponse profile = profileService.createProfile(profileDto);

        return ResponseEntity.created(URI.create("profiles/me")).body(profile);
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getProfile() throws BadRequestException {
        ProfileResponse profileResponse = profileService.getProfile();

        return ResponseEntity.ok(profileResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileResponse> putProfile(@Valid @RequestBody ProfileDto profileDto) throws BadRequestException {
        ProfileResponse profileResponse = profileService.putProfile(profileDto);

        return ResponseEntity.ok(profileResponse);
    }

    @PreAuthorize("hasRole('STAFF')")
    @GetMapping()
    public Page<ProfileResponse> getProfiles(@RequestParam int page, @RequestParam int size) {
        return profileService.getAll(page, size);
    }

//    @PreAuthorize("hasRole('STAFF')")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<ProfileResponse> deleteProfile(@PathVariable("id") String id) {
//        ProfileResponse profileResponse = profileService.putProfile(profileDto);
//
//        return ResponseEntity.ok(profileResponse);
//    }
}
