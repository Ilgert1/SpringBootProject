package com.example.nobsv2.business;

import com.example.nobsv2.business.dto.BusinessImportDTO;
import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.services.GooglePlacesCrawlerService;
import com.example.nobsv2.business.services.ImportBusinessesService;
import com.example.nobsv2.business.services.PythonCrawlerService;
import com.example.nobsv2.stripe.StripeService;
import com.example.nobsv2.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@CrossOrigin(origins = "${frontend.url:http://localhost:3000}")
@Slf4j
public class LeadSearchController {

    private final ImportBusinessesService importBusinessesService;
    //private final PythonCrawlerService pythonCrawlerService;  // Add this
    private final GooglePlacesCrawlerService googlePlacesCrawlerService;
    private final UserService userService;
    private final StripeService stripeService;

    @PostMapping("/search")
    public ResponseEntity<SearchResponse> searchLeads(@RequestBody SearchRequest request) {
        log.info("Received search request: city={}, state={}, radius={}, type={}",
                request.getCity(), request.getState(), request.getRadius(), request.getBusinessType());


        try {
            //GET CURRENT USER
            String username = userService.getCurrentUsername();

            if(!stripeService.canPerformAction(username, StripeService.ActionType.SEARCH)){
                log.warn("User {} reached search limit", username);
                SearchResponse limitResponse = new SearchResponse();
                limitResponse.setSuccess(false);
                limitResponse.setMessage("Search limit reached. Please upgrade your plan");
                return ResponseEntity.status(403).body(limitResponse);
            }


            // Validate
            if (request.getCity() == null || request.getCity().trim().isEmpty()) {
                throw new IllegalArgumentException("City is required");
            }
            if (request.getState() == null || request.getState().trim().isEmpty()) {
                throw new IllegalArgumentException("State is required");
            }

            // Build location
            String location = request.getCity().trim() + ", " + request.getState().trim();

            // Call Python crawler (ADDED THIS) --> changed to java instead
            List<BusinessImportDTO> crawledBusinesses = googlePlacesCrawlerService.crawl(
                    location,
                    request.getRadius(),
                    request.getBusinessType()
            );

            // Import to database (ADDED THIS)
            ImportBusinessesService.ImportResult result =
                    importBusinessesService.importBusinesses(crawledBusinesses);

            //Increment usage counter(only after successful search)
            stripeService.incrementUsage(username , StripeService.ActionType.SEARCH);
            log.info("Incremented search count for user: {}" , username);


            // Count businesses without website (ADDED THIS)
            int noWebsite = (int) crawledBusinesses.stream()
                    .filter(b -> "NO WEBSITE".equals(b.getWebsite()) || b.getWebsite() == null)
                    .count();

            // Build response
            SearchResponse response = new SearchResponse();
            response.setSuccess(true);
            response.setMessage("Search completed successfully");
            response.setLocation(location);
            response.setRadius(request.getRadius());
            response.setBusinessType(request.getBusinessType());
            response.setTotalFound(crawledBusinesses.size());  // Changed from 0
            response.setImported(result.getImported());  // Changed from 0
            response.setBusinessesWithoutWebsite(noWebsite);  // Changed from 0

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error searching for leads: {}", e.getMessage(), e);
            SearchResponse errorResponse = new SearchResponse();
            errorResponse.setSuccess(false);
            errorResponse.setMessage("Failed to search: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    // Keep your existing DTOs


    // Request DTO
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class SearchRequest {
        private String city;
        private String state;
        private Integer radius;
        private String businessType;
    }

    // Response DTO
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class SearchResponse {
        private boolean success;
        private String message;
        private String location;
        private Integer radius;
        private String businessType;
        private int totalFound;
        private int imported;
        private int businessesWithoutWebsite;
    }
}