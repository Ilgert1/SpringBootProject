package com.example.nobsv2.stripe;


import com.example.nobsv2.customization.CustomizationUsage;
import com.example.nobsv2.customization.CustomizationUsageRepository;
import com.example.nobsv2.security.CustomUser;
import com.example.nobsv2.security.CustomUserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripeService {

    private final CustomUserRepository userRepository;
    private final CustomizationUsageRepository customizationUsageRepository;
    //price ids
    @Value("${stripe.price.free}")
    private String freePriceId;

    @Value("${stripe.price.basic}")
    private String basicPriceId;

    @Value("${stripe.price.pro}")
    private String proPriceId;

    @Value("${stripe.price.enterprise}")
    private String enterprisePriceId;

    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    public String createCheckoutSession(String username, SubscriptionPlan plan) throws StripeException {
        CustomUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String priceId = getPriceIdForPlan(plan);

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl(frontendUrl + "/payment/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(frontendUrl + "/payment/canceled")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .setClientReferenceId(username);

        // Only set email if username is a valid email
        if (username.contains("@")) {
            paramsBuilder.setCustomerEmail(username);
        }
        // Otherwise Stripe will ask for email during checkout

        SessionCreateParams params = paramsBuilder.build();
        Session session = Session.create(params);

        log.info("✅ Created checkout session for user: {} - Plan: {}", username, plan);

        return session.getUrl();
    }

    @Transactional
    public void upgradeUserPlan(String username, SubscriptionPlan newPlan, String stripeCustomerId, String stripeSubscriptionId) {
        CustomUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setSubscriptionPlan(newPlan);
        user.setStripeCustomerId(stripeCustomerId);
        user.setStripeSubscriptionId(stripeSubscriptionId);
        user.setSubscriptionStatus("active");

        // Reset usage counters
        user.setSearchesUsed(0);
        user.setWebsitesGenerated(0);
        user.setMessagesGenerated(0);
        user.setUsageResetDate(LocalDateTime.now().plusMonths(1));

        userRepository.save(user);

        log.info("✅ Upgraded user {} to plan: {}", username, newPlan);
    }

    public boolean canPerformAction(String username, ActionType actionType) {
        CustomUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = user.getSubscriptionPlan();

        return switch (actionType) {
            case SEARCH -> plan.hasUnlimitedSearches() || user.getSearchesUsed() < plan.getMonthlySearches();
            case GENERATE_WEBSITE -> plan.hasUnlimitedWebsites() || user.getWebsitesGenerated() < plan.getMonthlyWebsiteGenerations();
            case GENERATE_MESSAGE -> plan.hasUnlimitedMessages() || user.getMessagesGenerated() < plan.getMonthlyMessages();
        };
    }

    //handle subscription level access
    @Transactional
    public void incrementUsage(String username, ActionType actionType) {
        CustomUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        switch (actionType){
            case SEARCH -> {
                user.setSearchesUsed(user.getSearchesUsed() + 1);
                log.info("User {} search count: {}/{}" ,
                        username,
                        user.getSearchesUsed(),
                        user.getSubscriptionPlan().getMonthlySearches()
                );
            }
            case GENERATE_WEBSITE -> {
                user.setWebsitesGenerated(user.getWebsitesGenerated() + 1);
                log.info("User {} website generation count: {}/{}" ,
                        username,
                        user.getWebsitesGenerated(),
                        user.getSubscriptionPlan().getMonthlyWebsiteGenerations()
                );
            }
            case GENERATE_MESSAGE -> {
                user.setMessagesGenerated(user.getMessagesGenerated() + 1);
                log.info("📊 User {} message count: {}/{}",
                        username,
                        user.getMessagesGenerated(),
                        user.getSubscriptionPlan().getMonthlyMessages());
            }
        }
        userRepository.save(user);
    }

    private String getPriceIdForPlan(SubscriptionPlan plan) {
        return switch (plan) {
            case FREE -> freePriceId;
            case BASIC -> basicPriceId;
            case PRO -> proPriceId;
            case ENTERPRISE -> enterprisePriceId;
        };
    }

    public boolean canCustomizeWebsite(String username) {
        CustomUser user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = user.getSubscriptionPlan();

        //only PRO and ENTERPRISE can customize
        return plan == SubscriptionPlan.PRO || plan == SubscriptionPlan.ENTERPRISE;
    }

    public int getCustomizationMessagesRemaining(String username, Integer businessId) {
        CustomUser user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = user.getSubscriptionPlan();

        if(!canCustomizeWebsite(username)){
            return  0;
        }

        CustomizationUsage usage = customizationUsageRepository
                .findByUsernameAndBusinessId(username, businessId)
                .orElse(new CustomizationUsage(username, businessId, 0));

        int limit = plan == SubscriptionPlan.PRO ? 10 : 50;

        return Math.max(0 , limit - usage.getMessagesUsed());
    }

    // Decrement customization message count
    public void decrementCustomizationMessages(String username, Integer businessId) {
        CustomizationUsage usage = customizationUsageRepository
                .findByUsernameAndBusinessId(username, businessId)
                .orElse(new CustomizationUsage(username, businessId, 0));

        usage.setMessagesUsed(usage.getMessagesUsed() + 1);
        customizationUsageRepository.save(usage);

        log.info("📊 User {} customization usage for business {}: {}",
                username, businessId, usage.getMessagesUsed());
    }

    public enum ActionType {
        SEARCH, GENERATE_WEBSITE, GENERATE_MESSAGE
    }


}
