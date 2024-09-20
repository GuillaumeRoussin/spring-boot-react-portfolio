package com.springportfolio.core.repository.user;

import com.springportfolio.core.entity.user.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepositoryInterface extends JpaRepository<Profile, Long> {
}
