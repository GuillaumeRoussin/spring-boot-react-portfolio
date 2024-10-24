package com.springportfolio.core.dtos.climbing;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ClimbingLocationDto {

    @NotEmpty(message = "The name of the climbing location is required.")
    private String name;

    @NotEmpty(message = "The description of the climbing location is required.")
    private String description;

    @NotEmpty(message = "There need to be at least one climbing location marker.")
    @Valid
    private List<ClimbingLocationMarkerDto> climbingLocationMarkers;
}
