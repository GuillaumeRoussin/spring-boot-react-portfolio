package com.springportfolio.core.repository.climbing;

import com.springportfolio.core.entity.climbing.ClimbingLocation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClimbingLocationRepositoryInterface extends CrudRepository<ClimbingLocation, Long> {
}
