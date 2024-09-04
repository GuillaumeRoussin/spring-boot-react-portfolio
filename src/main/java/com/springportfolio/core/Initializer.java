package com.springportfolio.core;

import com.springportfolio.core.entity.User;
import com.springportfolio.core.repository.UserRepositoryInterface;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepositoryInterface repository;

    public Initializer(UserRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
//        User user = User.builder().name("aaa").email("aaaa").build();
//        repository.save(user);
    }
}