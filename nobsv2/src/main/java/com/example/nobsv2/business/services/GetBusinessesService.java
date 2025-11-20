package com.example.nobsv2.business.services;

import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.model.Business.LeadStatus;
import com.example.nobsv2.business.repository.BusinessRepository;
import com.example.nobsv2.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetBusinessesService {

    private final BusinessRepository businessRepository;
    private final UserService userService;

    public List<Business> getAllBusinesses() {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsername(username);
    }

    public List<Business> getBusinessesWithoutWebsite() {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsernameWithoutWebsite(username);
    }

    public List<Business> getBusinessesWithGeneratedWebsites() {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsernameWithWebsiteGenerated(username);
    }

    public List<Business> getUncontactedLeads() {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsernameAndContactedFalse(username);
    }

    public List<Business> getBusinessesByStatus(LeadStatus status) {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsernameAndLeadStatus(username, status);
    }

    public List<Business> getBusinessesByType(String type) {
        String username = userService.getCurrentUsername();
        return businessRepository.findByUserUsernameAndTypesContaining(username, type);
    }

    public List<Business> searchBusinesses(String keyword) {
        String username = userService.getCurrentUsername();
        return businessRepository.searchByUserUsernameAndKeyword(username, keyword);
    }

    public BusinessStats getStats() {
        String username = userService.getCurrentUsername();
        List<Business> allBusinesses = businessRepository.findByUserUsername(username);

        long totalLeads = allBusinesses.size();
        long hotLeads = allBusinesses.stream()
                .filter(Business::needsWebsite)
                .count();
        long contacted = allBusinesses.stream()
                .filter(b -> Boolean.TRUE.equals(b.getContacted()))
                .count();
        long websitesGenerated = allBusinesses.stream()
                .filter(b -> Boolean.TRUE.equals(b.getWebsiteGenerated()))
                .count();

        return new BusinessStats(totalLeads, hotLeads, contacted, websitesGenerated);
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class BusinessStats {
        private long totalLeads;
        private long hotLeads;
        private long contacted;
        private long websitesGenerated;
    }
}