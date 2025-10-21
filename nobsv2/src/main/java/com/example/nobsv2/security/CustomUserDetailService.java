package com.example.nobsv2.security;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {

    public CustomUserDetailService(CustomUserRepository customUserRepository) {
        this.customUserRepository = customUserRepository;
    }

    private final CustomUserRepository customUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUser customUser = customUserRepository.findById(username).orElseThrow(() -> new UsernameNotFoundException(username));


        List<SimpleGrantedAuthority> auths = customUser.getRoleList().stream()
                // ensure ROLE_ prefix just in case your DB has BASIC / SUPERUSER
                .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
                .map(SimpleGrantedAuthority::new)
                .toList();

        return User
                .withUsername(customUser.getUsername())
                .password(customUser.getPassword())
                .authorities(auths)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
