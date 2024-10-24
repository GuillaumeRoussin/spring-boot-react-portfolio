package com.springportfolio.core.responses.climbing;

import com.springportfolio.core.entity.climbing.ClimbingLocation;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ClimbingLocationResponse {
    private UUID id;
    private String name;
    private String description;
    private List<ClimbingLocationMarkerResponse> climbingLocationMarkers;

    public static ClimbingLocationResponse fromEntity(ClimbingLocation climbingLocation) {
        return ClimbingLocationResponse.builder()
                .id(climbingLocation.getId())
                .name(climbingLocation.getName())
                .description(climbingLocation.getDescription())
                .climbingLocationMarkers(ClimbingLocationMarkerResponse.fromListEntity(climbingLocation.getClimbingLocationMarkers()))
                .build();
    }
}
