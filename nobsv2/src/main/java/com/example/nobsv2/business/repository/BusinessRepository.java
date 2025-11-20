package com.example.nobsv2.business.repository;

import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.model.Business.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Integer> {

    // Find by Google Place ID (unique identifier)
    Optional<Business> findByPlaceId(String placeId);

    // Find businesses without websites - these are our hot leads!
    @Query("SELECT b FROM Business b WHERE b.website = 'NO WEBSITE' OR b.website IS NULL OR b.website = ''")
    List<Business> findBusinessesWithoutWebsite();

    @Query(
            "SELECT b FROM Business b WHERE b.websiteGenerated = true OR b.generatedWebsiteCode != null"
    )
    List<Business> findBusinessesWithWebsiteGenerated();

    // Find by name (for search)
    List<Business> findByNameContainingIgnoreCase(String name);

    // Find by business type
    @Query("SELECT b FROM Business b WHERE b.types LIKE %:type%")
    List<Business> findByType(@Param("type") String type);

    // Find by lead status
    List<Business> findByLeadStatus(LeadStatus leadStatus);

    // Find businesses that haven't been contacted yet
    @Query("SELECT b FROM Business b WHERE b.contacted = false AND (b.website = 'NO WEBSITE' OR b.website IS NULL)")
    List<Business> findUncontactedLeads();

    // Find businesses where we generated a website
    List<Business> findByWebsiteGeneratedTrue();

    // Search by name, address, or phone
    @Query("SELECT b FROM Business b WHERE " +
            "b.name LIKE %:keyword% OR " +
            "b.address LIKE %:keyword% OR " +
            "b.phone LIKE %:keyword%")
    List<Business> searchBusinesses(@Param("keyword") String keyword);

    // Get businesses by status and whether they need a website
    @Query("SELECT b FROM Business b WHERE " +
            "b.businessStatus = :status AND " +
            "(b.website = 'NO WEBSITE' OR b.website IS NULL)")
    List<Business> findOperationalBusinessesWithoutWebsite(@Param("status") String status);

    // Count leads by status
    long countByLeadStatus(LeadStatus leadStatus);

    // Count businesses without website
    @Query("SELECT COUNT(b) FROM Business b WHERE b.website = 'NO WEBSITE' OR b.website IS NULL")
    long countBusinessesWithoutWebsite();
    // =========== NEW USER_SPECIFIC QUERIES ===============
    List<Business> findByUserUsername(String username);
    // Get businesses with generated websites for a user
    List<Business> findByUserUsernameAndWebsiteGenerated(String username, Boolean websiteGenerated);

    // Find by place_id AND user
    Optional<Business> findByPlaceIdAndUserUsername(String placeId, String username);

    @Query("SELECT b FROM Business b WHERE b.user.username = :username AND " +
            "(b.websiteGenerated = true OR b.generatedWebsiteCode IS NOT NULL)")
    List<Business> findByUserUsernameWithWebsiteGenerated(@Param("username") String username);

    // Get businesses without websites for a user
    @Query("SELECT b FROM Business b WHERE b.user.username = :username AND " +
            "(b.website = 'NO WEBSITE' OR b.website IS NULL OR b.website = '')")
    List<Business> findByUserUsernameWithoutWebsite(@Param("username") String username);

    // Get uncontacted leads for a user
    @Query("SELECT b FROM Business b WHERE b.user.username = :username AND b.contacted = false AND " +
            "(b.website = 'NO WEBSITE' OR b.website IS NULL)")
    List<Business> findByUserUsernameAndContactedFalse(@Param("username") String username);

    // Get businesses by status for a user
    List<Business> findByUserUsernameAndLeadStatus(String username, LeadStatus status);

    // Search businesses for a user
    @Query("SELECT b FROM Business b WHERE b.user.username = :username AND " +
            "(b.name LIKE %:keyword% OR b.address LIKE %:keyword% OR b.types LIKE %:keyword%)")
    List<Business> searchByUserUsernameAndKeyword(@Param("username") String username, @Param("keyword") String keyword);

    // Get businesses by type for a user
    @Query("SELECT b FROM Business b WHERE b.user.username = :username AND b.types LIKE %:type%")
    List<Business> findByUserUsernameAndTypesContaining(@Param("username") String username, @Param("type") String type);

    // Count stats for a user
    long countByUserUsername(String username);

    @Query("SELECT COUNT(b) FROM Business b WHERE b.user.username = :username AND " +
            "(b.website = 'NO WEBSITE' OR b.website IS NULL)")
    long countByUserUsernameWithoutWebsite(@Param("username") String username);

    long countByUserUsernameAndLeadStatus(String username, LeadStatus status);











}