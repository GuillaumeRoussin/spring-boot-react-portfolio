package com.springportfolio.core.services.user;

import com.springportfolio.core.repository.UserRepositoryInterface;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepositoryInterface userRepository;

    public UserService(UserRepositoryInterface userRepository) {
        this.userRepository = userRepository;
    }

    public List<DefaultUserResponse> allUsers() {
        List<DefaultUserResponse> users = new ArrayList<>();

        userRepository.findAll().forEach(user ->
                users.add(DefaultUserResponse.toDefaultUserResponse(user))
        );

        return users;
    }
}
