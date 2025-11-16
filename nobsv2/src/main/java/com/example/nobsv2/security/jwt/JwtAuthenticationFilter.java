package com.example.nobsv2.security.jwt;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.JwtException;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService uds) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = uds;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        String token = null;

        // First try Authorization header (for cross-domain requests)
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // Fallback to cookie (for same-domain requests)
        if (token == null) {
            System.out.println("❌ No token found in request to: " + req.getRequestURI());
            Cookie[] cookies = req.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("access_token".equals(c.getName())) {
                        token = c.getValue();
                        break;
                    }
                }
            }
        }else{
            System.out.println("✅ Token found for: " + req.getRequestURI());
            System.out.println("Token value: " + token.substring(0, 20) + "...");
        }

        if (token != null) {
            try {
                var claims = jwtUtil.parse(token).getBody();
                System.out.println("📋 Token subject: " + claims.getSubject());
                System.out.println("📋 Token roles: " + claims.get("roles"));
                var user = userDetailsService.loadUserByUsername(claims.getSubject());
                System.out.println("👤 User authorities: " + user.getAuthorities());
                var auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (JwtException e) {
                System.out.println("❌ JWT parsing failed: " + e.getMessage());
                // invalid/expired token → proceed unauthenticated
            }
        }
        chain.doFilter(req, res);
    }

}
