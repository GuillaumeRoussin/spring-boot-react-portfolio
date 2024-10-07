package com.springportfolio.core.dtos.user;

import com.springportfolio.core.enums.ClimbingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProfileDto {

    @NotBlank(message = "The description is required.")
    @Size(min = 10, max = 250, message = "The length of description must be between 10 and 250 characters.")
    private String description;

    private boolean profilePublic;

    @NotBlank(message = "The max rating is required.")
    @Size(min = 2, max = 3, message = "The length of max rating must be between 2 and 3 characters.")
    private String maxRating;

    private ClimbingType preferredClimbingType;

    private LocalDate birthDate;
}
