package com.example.nobsv2.business;

import com.example.nobsv2.business.dto.BusinessImportDTO;
import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.model.Business.LeadStatus;
import com.example.nobsv2.business.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@RequiredArgsConstructor
@CrossOrigin(origins = "${frontend.url:http://localhost:3000}")
public class BusinessController {

    private final GetBusinessesService getBusinessesService;
    private final GetBusinessService getBusinessService;
    private final UpdateBusinessService updateBusinessService;
    private final DeleteBusinessService deleteBusinessService;
    private final ImportBusinessesService importBusinessesService;
    private final WebsiteGenerationService websiteGenerationService;

    // Get all businesses
    @GetMapping
    public ResponseEntity<List<Business>> getAllBusinesses() {
        return ResponseEntity.ok(getBusinessesService.getAllBusinesses());
    }

    // Get businesses without website (hot leads!)
    @GetMapping("/no-website")
    public ResponseEntity<List<Business>> getBusinessesWithoutWebsite() {
        return ResponseEntity.ok(getBusinessesService.getBusinessesWithoutWebsite());
    }

    // Get uncontacted leads
    @GetMapping("/uncontacted")
    public ResponseEntity<List<Business>> getUncontactedLeads() {
        return ResponseEntity.ok(getBusinessesService.getUncontactedLeads());
    }

    // Get businesses by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Business>> getBusinessesByStatus(@PathVariable LeadStatus status) {
        return ResponseEntity.ok(getBusinessesService.getBusinessesByStatus(status));
    }

    // Get businesses by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Business>> getBusinessesByType(@PathVariable String type) {
        return ResponseEntity.ok(getBusinessesService.getBusinessesByType(type));
    }

    // Search businesses
    @GetMapping("/search")
    public ResponseEntity<List<Business>> searchBusinesses(@RequestParam String keyword) {
        return ResponseEntity.ok(getBusinessesService.searchBusinesses(keyword));
    }

    // Get statistics
    @GetMapping("/stats")
    public ResponseEntity<GetBusinessesService.BusinessStats> getStats() {
        return ResponseEntity.ok(getBusinessesService.getStats());
    }

    // Get single business
    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable Integer id) {
        return ResponseEntity.ok(getBusinessService.getBusinessById(id));
    }

    // Import businesses from crawler JSON
    @PostMapping("/import")
    public ResponseEntity<ImportBusinessesService.ImportResult> importBusinesses(
            @RequestBody List<BusinessImportDTO> businesses) {
        ImportBusinessesService.ImportResult result = importBusinessesService.importBusinesses(businesses);
        return ResponseEntity.ok(result);
    }

    // Update business
    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusiness(
            @PathVariable Integer id,
            @RequestBody Business business) {
        return ResponseEntity.ok(updateBusinessService.updateBusiness(id, business));
    }

    // Update lead status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Business> updateLeadStatus(
            @PathVariable Integer id,
            @RequestParam LeadStatus status) {
        return ResponseEntity.ok(updateBusinessService.updateLeadStatus(id, status));
    }

    // Mark as contacted
    @PatchMapping("/{id}/contacted")
    public ResponseEntity<Business> markAsContacted(
            @PathVariable Integer id,
            @RequestBody(required = false) String notes) {
        return ResponseEntity.ok(updateBusinessService.markAsContacted(id, notes));
    }

    @PostMapping("/{id}/generate-website")
    public ResponseEntity<WebsiteGenerationService.WebsiteGenerationResult> generateWebsite(
            @PathVariable Integer id) {
        WebsiteGenerationService.WebsiteGenerationResult result =
                websiteGenerationService.generateWebsite(id);
        return ResponseEntity.ok(result);
    }

    // Delete business
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable Integer id) {
        deleteBusinessService.deleteBusiness(id);
        return ResponseEntity.noContent().build();
    }

    // Delete all businesses (be careful with this!)
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllBusinesses() {
        deleteBusinessService.deleteAllBusinesses();
        return ResponseEntity.noContent().build();
    }
}