package com.example.nobsv2.security.jwt;

import com.example.nobsv2.security.dto.AuthResponse;
import com.example.nobsv2.security.dto.LoginRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final AuthenticationManager manager;
    private final JwtUtil jwt;

    public LoginController(AuthenticationManager manager, JwtUtil jwt) {
        this.manager = manager;
        this.jwt = jwt;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req, HttpServletResponse res) {
        Authentication auth = manager.authenticate(
                new UsernamePasswordAuthenticationToken(req.username(), req.password())
        );
        var user = (User) auth.getPrincipal();

        var access  = jwt.generateAccessToken(user);
        var refresh = jwt.generateRefreshToken(user);

        res.addCookie(cookie("access_token",  access,  30 * 60));
        res.addCookie(cookie("refresh_token", refresh, 7 * 24 * 60 * 60));

        // Return token in response body for cross-domain access
        return ResponseEntity.ok(new AuthResponse("logged_in", access));
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletResponse res) {
        res.addCookie(cookie("access_token", "", 0));
        res.addCookie(cookie("refresh_token", "", 0));
        return ResponseEntity.ok(new AuthResponse("logged_out"));
    }

    private Cookie cookie(String name, String value, int maxAge) {
        Cookie c = new Cookie(name, value);
        c.setHttpOnly(true);
        c.setSecure(true);
        c.setPath("/");
        c.setMaxAge(maxAge);
        c.setAttribute("SameSite", "None");  // Changed from "Lax"
        return c;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AuthResponse> badCreds() {
        return ResponseEntity.status(401).body(new AuthResponse("invalid_credentials"));
    }
}
