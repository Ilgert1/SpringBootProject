package com.example.nobsv2.customization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomizationUsageRepository extends JpaRepository<CustomizationUsage, Long> {
    Optional<CustomizationUsage> findByUsernameAndBusinessId(String username, Integer businessId);
}