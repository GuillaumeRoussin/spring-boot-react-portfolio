package com.springportfolio.core.dtos.user;

import com.springportfolio.core.constraints.annotations.ValidPasswordAnnotation;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterUserDto {
    @NotBlank(message = "The email address is required.")
    @Email(message = "The email address is invalid.", flags = {Pattern.Flag.CASE_INSENSITIVE})
    private String email;

    @ValidPasswordAnnotation
    private String password;

    @NotBlank(message = "The first name is required.")
    @Size(min = 2, max = 100, message = "The length of first name must be between 2 and 100 characters.")
    private String firstName;

    @NotBlank(message = "The last name is required.")
    @Size(min = 2, max = 100, message = "The length of last name must be between 2 and 100 characters.")
    private String lastName;
}
