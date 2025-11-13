package com.example.nobsv2.business.services;

import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.model.Business.LeadStatus;
import com.example.nobsv2.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetBusinessesService {

    private final BusinessRepository businessRepository;

    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    public List<Business> getBusinessesWithoutWebsite() {
        return businessRepository.findBusinessesWithoutWebsite();
    }

    public List<Business> getBusinessesByStatus(LeadStatus status) {
        return businessRepository.findByLeadStatus(status);
    }

    public List<Business> getUncontactedLeads() {
        return businessRepository.findUncontactedLeads();
    }

    public List<Business> getBusinessesByType(String type) {
        return businessRepository.findByType(type);
    }

    public List<Business> searchBusinesses(String keyword) {
        return businessRepository.searchBusinesses(keyword);
    }

    public List<Business> getBusinessesWithGeneratedWebsites() {
        return businessRepository.findByWebsiteGeneratedTrue();
    }

    // Get statistics
    public BusinessStats getStats() {
        long total = businessRepository.count();
        long withoutWebsite = businessRepository.countBusinessesWithoutWebsite();
        long newLeads = businessRepository.countByLeadStatus(LeadStatus.NEW);
        long converted = businessRepository.countByLeadStatus(LeadStatus.CONVERTED);

        return new BusinessStats(total, withoutWebsite, newLeads, converted);
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class BusinessStats {
        private long totalBusinesses;
        private long businessesWithoutWebsite;
        private long newLeads;
        private long converted;
    }
}