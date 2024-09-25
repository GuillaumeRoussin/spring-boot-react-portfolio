package com.springportfolio.core.services.user;

import com.springportfolio.core.dtos.user.ProfileDto;
import com.springportfolio.core.entity.user.Profile;
import com.springportfolio.core.entity.user.User;
import com.springportfolio.core.repository.user.ProfileRepositoryInterface;
import com.springportfolio.core.repository.user.UserRepositoryInterface;
import com.springportfolio.core.responses.user.ProfileResponse;
import com.springportfolio.core.services.authentication.AuthenticationService;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {
    private final AuthenticationService authenticationService;
    private final ProfileRepositoryInterface profileRepository;
    private final UserRepositoryInterface userRepository;

    public ProfileServiceImpl(AuthenticationService authenticationService, ProfileRepositoryInterface profileRepository, UserRepositoryInterface userRepository) {
        this.authenticationService = authenticationService;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public ProfileResponse createProfile(ProfileDto profileDto) throws BadRequestException {
        User user = authenticationService.getCurrentUser();
        if (user.getProfile() != null) {
            throw new BadRequestException("Profile already exists");
        } else {
            Profile profile = Profile.builder()
                    .birthDate(profileDto.getBirthDate())
                    .profilePublic(profileDto.isProfilePublic())
                    .description(profileDto.getDescription())
                    .maxRating(profileDto.getMaxRating())
                    .preferredClimbingType(profileDto.getPreferredClimbingType())
                    .build();
            profileRepository.save(profile);
            user.setProfile(profile);
            userRepository.save(user);
            return ProfileResponse.toProfileResponse(profile);
        }
    }

    public ProfileResponse putProfile(ProfileDto profileDto) throws BadRequestException {
        User user = authenticationService.getCurrentUser();
        if (user.getProfile() == null) {
            throw new BadRequestException("Profile doesn't exists");
        } else {
            Profile profile = user.getProfile();
            profile.setProfilePublic(profileDto.isProfilePublic());
            profile.setDescription(profileDto.getDescription());
            profile.setMaxRating(profileDto.getMaxRating());
            profile.setPreferredClimbingType(profileDto.getPreferredClimbingType());
            profile.setBirthDate(profileDto.getBirthDate());
            profileRepository.save(profile);
            return ProfileResponse.toProfileResponse(profile);
        }
    }

    public ProfileResponse getProfile() throws BadRequestException {
        User user = authenticationService.getCurrentUser();
        if (user.getProfile() == null) {
            throw new BadRequestException("Profile doesn't exists");
        }
        return ProfileResponse.toProfileResponse(user.getProfile());
    }

    public Page<ProfileResponse> getAll(Pageable pageable) {
        Page<Profile> profiles = profileRepository.findAll(pageable);
        return profiles.map(ProfileResponse::toProfileResponse);
    }
}
