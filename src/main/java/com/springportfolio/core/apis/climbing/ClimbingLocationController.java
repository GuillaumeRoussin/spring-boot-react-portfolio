package com.springportfolio.core.apis.climbing;

import com.springportfolio.core.dtos.climbing.ClimbingLocationDto;
import com.springportfolio.core.responses.climbing.ClimbingLocationResponse;
import com.springportfolio.core.services.climbing.ClimbingLocationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@PreAuthorize("hasRole('USER')")
@RequestMapping("/climbing-locations")
@RestController
public class ClimbingLocationController {
    private final ClimbingLocationService climbingLocationService;

    public ClimbingLocationController(ClimbingLocationService climbingLocationService) {
        this.climbingLocationService = climbingLocationService;
    }

    @PostMapping
    public ResponseEntity<ClimbingLocationResponse> createClimbingLocation(@Valid @RequestBody ClimbingLocationDto climbingLocationDto) {
        ClimbingLocationResponse climbingLocationResponse = climbingLocationService.createClimbingLocation(climbingLocationDto);

        return ResponseEntity.created(URI.create("climbing-locations/" + climbingLocationResponse.getId().toString())).body(climbingLocationResponse);
    }
}
