package com.springportfolio.core.repository;

import com.springportfolio.core.entity.Privilege;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrivilegeRepositoryInterface extends CrudRepository<Privilege, Integer> {
    Optional<Privilege> findByName(String name);
}
