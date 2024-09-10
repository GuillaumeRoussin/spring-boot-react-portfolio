package com.springportfolio.core.repository;

import com.springportfolio.core.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositoryInterface extends CrudRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
