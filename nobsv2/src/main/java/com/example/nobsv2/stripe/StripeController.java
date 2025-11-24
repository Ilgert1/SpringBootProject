package com.example.nobsv2.stripe;

import com.example.nobsv2.user.UserService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stripe")
@RequiredArgsConstructor
@Slf4j
public class StripeController {

    private final StripeService stripeService;
    private final UserService userService;

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


    public record CheckoutRequest(SubscriptionPlan plan){}
    public record CheckoutResponse(String checkoutUrl){}


}
