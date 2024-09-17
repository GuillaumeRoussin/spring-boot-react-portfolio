package com.springportfolio.core.repository.user;

import com.springportfolio.core.entity.user.Profil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilRepositoryInterface extends CrudRepository<Profil, Long> {
}
