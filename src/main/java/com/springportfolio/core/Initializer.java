package com.springportfolio.core;

import com.springportfolio.core.entity.security.Privilege;
import com.springportfolio.core.entity.security.Role;
import com.springportfolio.core.entity.user.Profile;
import com.springportfolio.core.entity.user.User;
import com.springportfolio.core.enums.ClimbingType;
import com.springportfolio.core.repository.security.PrivilegeRepositoryInterface;
import com.springportfolio.core.repository.security.RoleRepositoryInterface;
import com.springportfolio.core.repository.user.UserRepositoryInterface;
import jakarta.transaction.Transactional;
import net.datafaker.Faker;
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
        Role userRole = createRoleIfNotFound("ROLE_USER", Collections.singletonList(readPrivilege));
        Role staffRole = createRoleIfNotFound("ROLE_STAFF", Collections.singletonList(readPrivilege));
        createUser("admin@test.com", adminRole);
        createUser("user@test.com", userRole);
        createUser("staff@test.com", staffRole);
        for (int i = 0; i < 20; i++) {
            createUser("user" + i + "@test.com", userRole);
        }
    }

    private void createUser(String mail, Role adminRole) {
        Faker faker = new Faker();
        Profile profile = Profile.builder()
                .profilePublic(faker.bool().bool())
                .maxRating("8a+")
                .description(faker.lorem().paragraph(2))
                .birthDate(faker.timeAndDate().birthday())
                .preferredClimbingType(getRandomClimbingType())
                .build();
        User userAdmin = User
                .builder()
                .firstName(faker.name().firstName())
                .lastName(faker.name().lastName())
                .password(passwordEncoder.encode("test"))
                .email(mail)
                .roles(Collections.singletonList(adminRole))
                .profile(profile)
                .build();
        userRepository.save(userAdmin);
    }

    public static ClimbingType getRandomClimbingType() {
        Random random = new Random();
        ClimbingType[] colors = ClimbingType.values();
        int randomIndex = random.nextInt(colors.length);
        return colors[randomIndex];
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