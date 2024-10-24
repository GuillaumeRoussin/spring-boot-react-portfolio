package com.springportfolio.core.repository.climbing;

import com.springportfolio.core.entity.climbing.ClimbingLocation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClimbingLocationRepositoryInterface extends CrudRepository<ClimbingLocation, UUID> {
}
