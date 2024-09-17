package com.springportfolio.core.repository.user;

import com.springportfolio.core.entity.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositoryInterface extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
