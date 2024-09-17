package com.springportfolio.core.repository.climbing;

import com.springportfolio.core.entity.climbing.ClimbingProposal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClimbingProposalRepositoryInterface extends CrudRepository<ClimbingProposal, Long> {
}
