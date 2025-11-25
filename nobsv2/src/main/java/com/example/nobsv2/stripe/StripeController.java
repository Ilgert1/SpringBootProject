package com.example.nobsv2.stripe;

import com.example.nobsv2.user.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionRetrieveParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stripe")
@Slf4j
public class StripeController {

    private final StripeService stripeService;
    private final UserService userService;

    // Add these @Value fields
    @Value("${stripe.price.free}")
    private String freePriceId;

    @Value("${stripe.price.basic}")
    private String basicPriceId;

    @Value("${stripe.price.pro}")
    private String proPriceId;

    @Value("${stripe.price.enterprise}")
    private String enterprisePriceId;

    // Constructor injection (can't use @RequiredArgsConstructor with @Value)
    public StripeController(StripeService stripeService, UserService userService) {
        this.stripeService = stripeService;
        this.userService = userService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<CheckoutResponse> createCheckoutSession(@RequestBody CheckoutRequest request){
        try{
            String username = userService.getCurrentUsername();
            String checkoutUrl = stripeService.createCheckoutSession(username , request.plan());

            return ResponseEntity.ok(new CheckoutResponse(checkoutUrl));

        }catch (StripeException e){
            log.error("Stripe error: {}" , e.getMessage());
            return ResponseEntity.badRequest().body(new CheckoutResponse(null));
        }
    }

    @PostMapping("/verify-session")
    public ResponseEntity<VerifyResponse> verifySession(@RequestBody VerifyRequest request) {
        try {
            String username = userService.getCurrentUsername();

            // Retrieve the session from Stripe with line items
            SessionRetrieveParams params = SessionRetrieveParams.builder()
                    .addExpand("line_items")
                    .build();
            Session session = Session.retrieve(request.sessionId(), params, null);

            log.info("📋 Session status: {}", session.getStatus());
            log.info("📋 Payment status: {}", session.getPaymentStatus());

            // Check if session is complete (either status works)
            if ("complete".equals(session.getStatus()) || "paid".equals(session.getPaymentStatus())) {
                // Get the subscription plan from price ID
                String priceId = session.getLineItems().getData().get(0).getPrice().getId();
                SubscriptionPlan plan = getPlanFromPriceId(priceId);

                // Upgrade the user
                stripeService.upgradeUserPlan(
                        username,
                        plan,
                        session.getCustomer(),
                        session.getSubscription()
                );

                log.info("✅ Verified and activated subscription for user: {}", username);
                return ResponseEntity.ok(new VerifyResponse(true, "Subscription activated"));
            } else {
                log.error("❌ Payment not complete. Status: {}, Payment Status: {}",
                        session.getStatus(), session.getPaymentStatus());
                return ResponseEntity.badRequest().body(
                        new VerifyResponse(false, "Payment not complete. Status: " + session.getStatus())
                );
            }

        } catch (StripeException e) {
            log.error("Stripe verification error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new VerifyResponse(false, e.getMessage()));
        }
    }

    private SubscriptionPlan getPlanFromPriceId(String priceId) {
        if (priceId.equals(freePriceId)) return SubscriptionPlan.FREE;
        if (priceId.equals(basicPriceId)) return SubscriptionPlan.BASIC;
        if (priceId.equals(proPriceId)) return SubscriptionPlan.PRO;
        if (priceId.equals(enterprisePriceId)) return SubscriptionPlan.ENTERPRISE;
        return SubscriptionPlan.FREE;
    }

    public record VerifyRequest(String sessionId) {}
    public record VerifyResponse(boolean success, String message) {}
    public record CheckoutRequest(SubscriptionPlan plan){}
    public record CheckoutResponse(String checkoutUrl){}
}