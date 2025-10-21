package com.example.nobsv2.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class MeController {
    record MeResponse(String username, List<String> roles) {}

    @GetMapping("/me")
    public MeResponse me(Authentication auth) {
        var user = (User) auth.getPrincipal();
        var roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return new MeResponse(user.getUsername(), roles);
    }
}
