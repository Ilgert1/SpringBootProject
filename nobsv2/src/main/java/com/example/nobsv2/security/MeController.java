package com.example.nobsv2.security;

import com.example.nobsv2.stripe.SubscriptionPlan;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class MeController {

    private final CustomUserRepository userRepository;

    public MeController(CustomUserRepository userRepository) {
        this.userRepository = userRepository;
    }


    record MeResponse(String username,
                      List<String> roles,
                      SubscriptionPlan subscriptionPlan,
                      String subscriptionStatus,
                      int searchesUsed,
                      int websitesGenerated,
                      int messagesGenerated,
                      int searchesRemaining,
                      int websitesRemaining,
                      int messagesRemaining,
                      int monthlySearches,
                      int monthlyWebsites,
                      int monthlyMessages
                      ) {}

    @GetMapping("/me")
    public MeResponse me(Authentication auth) {
        var user = (User) auth.getPrincipal();
        var roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // Get full user details from database
        CustomUser customUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = customUser.getSubscriptionPlan();

        // Calculate remaining usage
        int searchesRemaining = plan.hasUnlimitedSearches() ? -1 :
                Math.max(0, plan.getMonthlySearches() - customUser.getSearchesUsed());

        int websitesRemaining = plan.hasUnlimitedWebsites() ? -1 :
                Math.max(0, plan.getMonthlyWebsiteGenerations() - customUser.getWebsitesGenerated());

        int messagesRemaining = plan.hasUnlimitedMessages() ? -1 :
                Math.max(0, plan.getMonthlyMessages() - customUser.getMessagesGenerated());

        return new MeResponse(
                user.getUsername(),
                roles,
                customUser.getSubscriptionPlan(),
                customUser.getSubscriptionStatus(),
                customUser.getSearchesUsed(),
                customUser.getWebsitesGenerated(),
                customUser.getMessagesGenerated(),
                searchesRemaining,
                websitesRemaining,
                messagesRemaining,
                plan.getMonthlySearches(),
                plan.getMonthlyWebsiteGenerations(),
                plan.getMonthlyMessages()
        );
    }
}
