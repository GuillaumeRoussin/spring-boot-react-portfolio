package com.springportfolio.core.repository.user;

import com.springportfolio.core.entity.user.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepositoryInterface extends CrudRepository<Profile, Long> {
}
