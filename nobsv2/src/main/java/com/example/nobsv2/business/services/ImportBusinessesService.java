package com.example.nobsv2.business.services;

import com.example.nobsv2.business.dto.BusinessImportDTO;
import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.repository.BusinessRepository;
import com.example.nobsv2.security.CustomUser;
import com.example.nobsv2.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImportBusinessesService {

    private final BusinessRepository businessRepository;
    private final UserService userService;  // Add this

    @Transactional
    public ImportResult importBusinesses(List<BusinessImportDTO> businesses) {
        CustomUser currentUser = userService.getCurrentUser();

        int imported = 0;
        int skipped = 0;
        int updated = 0;
        List<String> errors = new ArrayList<>();

        for (BusinessImportDTO dto : businesses) {
            try {
                // Check if THIS USER already has this business
                Optional<Business> existing = businessRepository.findByPlaceIdAndUserUsername(
                        dto.getPlace_id(),
                        currentUser.getUsername()  // Check per user!
                );

                if (existing.isPresent()) {
                    // Update existing business for this user
                    Business business = existing.get();
                    updateBusinessFromDTO(business, dto);
                    businessRepository.save(business);
                    updated++;
                } else {
                    // Create new business for this user
                    Business business = convertDTOToBusiness(dto);
                    business.setUser(currentUser);
                    businessRepository.save(business);
                    imported++;
                }
            } catch (Exception e) {
                errors.add("Error importing " + dto.getName() + ": " + e.getMessage());
                skipped++;
            }
        }

        return new ImportResult(imported, updated, skipped, errors);
    }

    private Business convertDTOToBusiness(BusinessImportDTO dto) {
        Business business = new Business();
        updateBusinessFromDTO(business, dto);
        return business;
    }

    private void updateBusinessFromDTO(Business business, BusinessImportDTO dto) {
        business.setName(dto.getName());
        business.setAddress(dto.getAddress());
        business.setWebsite(dto.getWebsite());
        business.setPhone(dto.getPhone());
        business.setRating(dto.getRating());
        business.setTotalRatings(dto.getTotal_ratings());
        business.setPlaceId(dto.getPlace_id());
        business.setBusinessStatus(dto.getBusiness_status());

        // Convert types list to comma-separated string
        if (dto.getTypes() != null && !dto.getTypes().isEmpty()) {
            business.setTypes(String.join(",", dto.getTypes()));
        }

        // Set initial contacted status
        if (business.getContacted() == null) {
            business.setContacted(false);
        }

        if (business.getWebsiteGenerated() == null) {
            business.setWebsiteGenerated(false);
        }
    }

    // Result class for import operation
    @lombok.Data
    @lombok.AllArgsConstructor
    public static class ImportResult {
        private int imported;
        private int updated;
        private int skipped;
        private List<String> errors;

        public String getSummary() {
            return String.format("Imported: %d, Updated: %d, Skipped: %d, Errors: %d",
                    imported, updated, skipped, errors.size());
        }
    }
}