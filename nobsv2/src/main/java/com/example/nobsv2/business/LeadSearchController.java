package com.example.nobsv2.business;

import com.example.nobsv2.business.dto.BusinessImportDTO;
import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.services.ImportBusinessesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@RequiredArgsConstructor
@CrossOrigin(origins = "${frontend.url:http://localhost:3000}")
@Slf4j
public class LeadSearchController {

    private final ImportBusinessesService importBusinessesService;
    // We'll add PythonCrawlerService later

    @PostMapping("/search")
    public ResponseEntity<SearchResponse> searchLeads(@RequestBody SearchRequest request) {
        log.info("Received search request: city={}, state={}, radius={}, type={}",
                request.getCity(), request.getState(), request.getRadius(), request.getBusinessType());

        try {
            // Step 1: Validate request
            if (request.getCity() == null || request.getCity().trim().isEmpty()) {
                throw new IllegalArgumentException("City is required");
            }
            if (request.getState() == null || request.getState().trim().isEmpty()) {
                throw new IllegalArgumentException("State is required");
            }

            // Build location string
            String location = request.getCity().trim() + ", " + request.getState().trim();

            // Step 2: Call Python crawler (we'll implement this next)
            // For now, return a placeholder response
            log.info("Would search for businesses in: {}, radius: {}m, type: {}",
                    location, request.getRadius(), request.getBusinessType());

            // TODO: Call Python script here
            // List<BusinessImportDTO> crawledBusinesses = pythonCrawlerService.crawl(
            //     location,
            //     request.getRadius(),
            //     request.getBusinessType()
            // );

            // Step 3: Import results to database
            // ImportBusinessesService.ImportResult result = importBusinessesService.importBusinesses(crawledBusinesses);

            // Step 4: Return response
            SearchResponse response = new SearchResponse();
            response.setSuccess(true);
            response.setMessage("Search endpoint ready - Python integration coming next");
            response.setLocation(location);
            response.setRadius(request.getRadius());
            response.setBusinessType(request.getBusinessType());
            response.setTotalFound(0);
            response.setImported(0);
            response.setBusinessesWithoutWebsite(0);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            log.error("Validation error: {}", e.getMessage());
            SearchResponse errorResponse = new SearchResponse();
            errorResponse.setSuccess(false);
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);

        } catch (Exception e) {
            log.error("Error searching for leads: {}", e.getMessage(), e);
            SearchResponse errorResponse = new SearchResponse();
            errorResponse.setSuccess(false);
            errorResponse.setMessage("Failed to search for leads: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

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