package com.springportfolio.core.services.user;

import com.springportfolio.core.entity.Privilege;
import com.springportfolio.core.entity.Role;
import com.springportfolio.core.entity.User;
import com.springportfolio.core.repository.RoleRepositoryInterface;
import com.springportfolio.core.repository.UserRepositoryInterface;
import com.springportfolio.core.responses.user.DefaultUserResponse;
import jakarta.transaction.Transactional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepositoryInterface userRepository;
    private final RoleRepositoryInterface roleRepository;

    public UserService(UserRepositoryInterface userRepository, RoleRepositoryInterface roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<DefaultUserResponse> allUsers() {
        List<DefaultUserResponse> users = new ArrayList<>();

        userRepository.findAll().forEach(user ->
                users.add(DefaultUserResponse.toDefaultUserResponse(user))
        );

        return users;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<Role> roles) {

        return getGrantedAuthorities(getPrivileges(roles));
    }

    private List<String> getPrivileges(Collection<Role> roles) {

        List<String> privileges = new ArrayList<>();
        List<Privilege> collection = new ArrayList<>();
        for (Role role : roles) {
            privileges.add(role.getName());
            collection.addAll(role.getPrivileges());
        }
        for (Privilege item : collection) {
            privileges.add(item.getName());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByEmail(email);
        Optional<Role> role = roleRepository.findByName("ROLE_USER");
        return user.map(value -> new org.springframework.security.core.userdetails.User(
                value.getEmail(), value.getPassword(), true, true, true,
                true, getAuthorities(value.getRoles()))).orElseGet(() -> new org.springframework.security.core.userdetails.User(
                " ", " ", true, true, true, true,
                getAuthorities(List.of(role.orElseThrow()))));

    }
}
