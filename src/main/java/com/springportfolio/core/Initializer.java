package com.springportfolio.core;

import com.springportfolio.core.entity.Privilege;
import com.springportfolio.core.entity.Role;
import com.springportfolio.core.entity.User;
import com.springportfolio.core.repository.PrivilegeRepositoryInterface;
import com.springportfolio.core.repository.RoleRepositoryInterface;
import com.springportfolio.core.repository.UserRepositoryInterface;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepositoryInterface userRepository;
    private final PrivilegeRepositoryInterface privilegeRepository;
    private final RoleRepositoryInterface roleRepository;
    private final PasswordEncoder passwordEncoder;

    public Initializer(UserRepositoryInterface userRepository, PrivilegeRepositoryInterface privilegeRepository, RoleRepositoryInterface roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.privilegeRepository = privilegeRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... strings) {
        Privilege readPrivilege
                = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege
                = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        List<Privilege> adminPrivileges = Arrays.asList(
                readPrivilege, writePrivilege);
        Role adminRole = createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Collections.singletonList(readPrivilege));
        User user = User
                .builder()
                .firstName("Test")
                .lastName("Test")
                .password(passwordEncoder.encode("test"))
                .email("test@test.com")
                .roles(Collections.singletonList(adminRole))
                .build();
        userRepository.save(user);
    }

    @Transactional
    public Privilege createPrivilegeIfNotFound(String name) {
        Optional<Privilege> optionalPrivilege = privilegeRepository.findByName(name);

        if (optionalPrivilege.isEmpty()) {
            Privilege privilege = Privilege.builder().name(name).build();
            return privilegeRepository.save(privilege);
        } else {
            return optionalPrivilege.get();
        }
    }

    @Transactional
    public Role createRoleIfNotFound(
            String name, Collection<Privilege> privileges) {

        Optional<Role> optionalRole = roleRepository.findByName(name);
        if (optionalRole.isEmpty()) {
            Role role = Role.builder().name(name).privileges(privileges).build();
            return roleRepository.save(role);
        } else {
            return optionalRole.get();
        }
    }
}