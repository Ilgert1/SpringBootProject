package com.example.nobsv2.stripe;

import com.example.nobsv2.ai.dto.ClaudeDTO;
import com.example.nobsv2.security.CustomUserRepository;
import com.example.nobsv2.security.MeController;
import com.example.nobsv2.user.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerListParams;
import com.stripe.param.SubscriptionListParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/stripe")
@Slf4j
public class StripeController {

    private final StripeService stripeService;
    private final UserService userService;
    private final CustomUserRepository customUserRepository;

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
    public StripeController(StripeService stripeService, UserService userService, CustomUserRepository customUserRepository) {
        this.stripeService = stripeService;
        this.userService = userService;
        this.customUserRepository = customUserRepository;
    }

    @GetMapping("/v1/customers")
    public ResponseEntity<List<StripeCustomerInfoDto>> currentUsers() {
        try {
            CustomerListParams customerParams = CustomerListParams.builder()
                    .setLimit(100L) // adjust as needed
                    .build();

            Iterable<Customer> customers = Customer.list(customerParams).autoPagingIterable();

            List<StripeCustomerInfoDto> result = new ArrayList<>();

            for (Customer c : customers) {
                if (c == null) continue;

                String customerId = c.getId();
                String email = c.getEmail();

                // Default when no subscriptions exist
                String subscriptionStatus = "none";

                // List subscriptions for this customer and pick the most recently created one
                SubscriptionListParams subsParams = SubscriptionListParams.builder()
                        .setCustomer(customerId)
                        .setLimit(100L)
                        .build();

                Iterable<Subscription> subscriptions = Subscription.list(subsParams).autoPagingIterable();

                long latestCreated = -1L;
                for (Subscription s : subscriptions) {
                    if (s == null) continue;
                    Long created = s.getCreated();
                    if (created != null && created > latestCreated) {
                        latestCreated = created;
                        subscriptionStatus = s.getStatus(); // active, past_due, canceled, incomplete, etc.
                    }
                }

                result.add(new StripeCustomerInfoDto(customerId, email, subscriptionStatus));
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            // log the error (use your logger)
            // log.error("Error fetching Stripe customers/subscriptions", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<BalanceResponse> getBalance() {

        try {
            // Retrieve the actual Stripe balance
            Balance balance = Balance.retrieve();

            // Stripe returns two types of balance amounts:
            // - available
            // - pending
            Long available = balance.getAvailable().get(0).getAmount();
            Long pending = balance.getPending().get(0).getAmount();

            return ResponseEntity.ok(
                    new BalanceResponse(
                            "Available: " + available + ", Pending: " + pending
                    )
            );

        } catch (Exception e) {
            log.error("Unable to get balance", e);
            return ResponseEntity.status(500).body(
                    new BalanceResponse("Error retrieving balance")
            );
        }
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
    //new
    public record BalanceRequest(String user){}
    public record BalanceResponse(String balance){}

}