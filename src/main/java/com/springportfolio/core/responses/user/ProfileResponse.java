package com.springportfolio.core.responses.user;

import com.springportfolio.core.entity.user.Profile;
import com.springportfolio.core.enums.ClimbingType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ProfileResponse {

    private Long id;
    private String description;
    private boolean profilePublic;
    private String maxRating;
    private ClimbingType preferredClimbingType;
    private LocalDate birthDate;

    public static ProfileResponse toProfileResponse(Profile profile) {
        return ProfileResponse.builder()
                .id(profile.getId())
                .description(profile.getDescription())
                .profilePublic(profile.isProfilePublic())
                .maxRating(profile.getMaxRating())
                .preferredClimbingType(profile.getPreferredClimbingType())
                .birthDate(profile.getBirthDate())
                .build();
    }
}
