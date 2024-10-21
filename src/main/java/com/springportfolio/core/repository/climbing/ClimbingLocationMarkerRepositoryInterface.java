package com.springportfolio.core.repository.climbing;

import com.springportfolio.core.entity.climbing.ClimbingLocationMarker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClimbingLocationMarkerRepositoryInterface extends CrudRepository<ClimbingLocationMarker, UUID> {
}
