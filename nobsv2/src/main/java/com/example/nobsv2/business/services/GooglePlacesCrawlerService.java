package com.example.nobsv2.business.services;

import com.example.nobsv2.ai.GoogleConfig;
import com.example.nobsv2.business.dto.BusinessImportDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.example.nobsv2.ai.GoogleConfig.*;

@Service
@Slf4j
public class GooglePlacesCrawlerService {

    private static final String BASE_URL = "https://maps.googleapis.com/maps/api/place";
    private final String apiKey = "AIzaSyA3Xd5Sn5pZjQcUWcDV_hf7nmyZk6INlHg";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<BusinessImportDTO> crawl(String location, int radius, String businessType) throws Exception {
        log.info("Starting crawler for location: {}, radius: {}, type: {}", location, radius, businessType);

        // 1️⃣ Geocode the location
        String geocodeUrl = UriComponentsBuilder.fromHttpUrl(BASE_URL.replace("/place","") + "/geocode/json")
                .queryParam("address", location)
                .queryParam("key", apiKey)
                .toUriString();

        Map<String, Object> geoResponse = restTemplate.getForObject(geocodeUrl, Map.class);
        if (!"OK".equals(geoResponse.get("status"))) {
            throw new RuntimeException("Geocoding failed: " + geoResponse.get("status"));
        }

        Map<String, Object> locationMap = (Map<String, Object>) ((Map<String, Object>) ((Map<String, Object>) ((List<Object>) geoResponse.get("results")).get(0)).get("geometry")).get("location");
        double lat = (double) locationMap.get("lat");
        double lng = (double) locationMap.get("lng");
        String locationStr = lat + "," + lng;

        // 2️⃣ Nearby search
        List<BusinessImportDTO> allBusinesses = new ArrayList<>();
        String nextPageToken = null;

        do {
            UriComponentsBuilder nearbyBuilder = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/nearbysearch/json")
                    .queryParam("location", locationStr)
                    .queryParam("radius", radius)
                    .queryParam("key", apiKey);

            if (businessType != null && !businessType.isBlank()) {
                nearbyBuilder.queryParam("type", businessType);
            }

            if (nextPageToken != null) {
                nearbyBuilder.queryParam("pagetoken", nextPageToken);
                Thread.sleep(2000); // Google requires a short delay when using next_page_token
            }

            Map<String, Object> searchResponse = restTemplate.getForObject(nearbyBuilder.toUriString(), Map.class);
            List<Map<String,Object>> results = (List<Map<String,Object>>) searchResponse.get("results");
            if (results != null) {
                for (Map<String,Object> r : results) {
                    String placeId = (String) r.get("place_id");
                    allBusinesses.add(getBusinessDetails(placeId, r));
                }
            }

            nextPageToken = (String) searchResponse.get("next_page_token");
        } while (nextPageToken != null);

        log.info("Crawled {} businesses", allBusinesses.size());
        return allBusinesses;
    }

    private BusinessImportDTO getBusinessDetails(String placeId, Map<String,Object> basicInfo) throws Exception {
        String detailsUrl = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/details/json")
                .queryParam("place_id", placeId)
                .queryParam("fields", "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,business_status,types")
                .queryParam("key", apiKey)
                .toUriString();

        Map<String,Object> detailsResponse = restTemplate.getForObject(detailsUrl, Map.class);
        Map<String,Object> result = (Map<String,Object>) detailsResponse.get("result");

        return new BusinessImportDTO(
                (String) result.get("name"),
                (String) result.get("formatted_address"),
                result.get("website") != null ? (String) result.get("website") : "NO WEBSITE",
                result.get("formatted_phone_number") != null ? (String) result.get("formatted_phone_number") : "N/A",
                result.get("rating") != null ? Double.valueOf(result.get("rating").toString()) : null,
                result.get("user_ratings_total") != null ? Integer.valueOf(result.get("user_ratings_total").toString()) : null,
                result.get("types") != null ? (List<String>) result.get("types") : null,
                placeId,
                result.get("business_status") != null ? (String) result.get("business_status") : "UNKNOWN"
        );
    }
}
