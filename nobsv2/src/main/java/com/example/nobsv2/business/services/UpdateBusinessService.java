package com.example.nobsv2.business.services;

import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.model.Business.LeadStatus;
import com.example.nobsv2.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdateBusinessService {

    private final BusinessRepository businessRepository;

    @Transactional
    public Business updateBusiness(Integer id, Business updatedBusiness) {
        Business existing = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + id));

        // Update fields
        if (updatedBusiness.getName() != null) {
            existing.setName(updatedBusiness.getName());
        }
        if (updatedBusiness.getAddress() != null) {
            existing.setAddress(updatedBusiness.getAddress());
        }
        if (updatedBusiness.getPhone() != null) {
            existing.setPhone(updatedBusiness.getPhone());
        }
        if (updatedBusiness.getWebsite() != null) {
            existing.setWebsite(updatedBusiness.getWebsite());
        }
        if (updatedBusiness.getNotes() != null) {
            existing.setNotes(updatedBusiness.getNotes());
        }
        if (updatedBusiness.getLeadStatus() != null) {
            existing.setLeadStatus(updatedBusiness.getLeadStatus());
        }

        return businessRepository.save(existing);
    }

    @Transactional
    public Business updateLeadStatus(Integer id, LeadStatus status) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + id));

        business.setLeadStatus(status);

        // Auto-update contacted flag if moving to CONTACTED or beyond
        if (status == LeadStatus.CONTACTED ||
                status == LeadStatus.INTERESTED ||
                status == LeadStatus.DEMO_SENT ||
                status == LeadStatus.CONVERTED) {
            business.setContacted(true);
        }

        return businessRepository.save(business);
    }

    @Transactional
    public Business markAsContacted(Integer id, String notes) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + id));

        business.setContacted(true);
        business.setLeadStatus(LeadStatus.CONTACTED);

        if (notes != null) {
            String existingNotes = business.getNotes() != null ? business.getNotes() + "\n" : "";
            business.setNotes(existingNotes + notes);
        }

        return businessRepository.save(business);
    }

    @Transactional
    public Business markWebsiteGenerated(Integer id, String websiteUrl, String generatedCode) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + id));

        business.setWebsiteGenerated(true);
        business.setGeneratedWebsiteUrl(websiteUrl);
        business.setGeneratedWebsiteCode(generatedCode);  // Save the code
        business.setLeadStatus(LeadStatus.DEMO_SENT);

        return businessRepository.save(business);
    }
}