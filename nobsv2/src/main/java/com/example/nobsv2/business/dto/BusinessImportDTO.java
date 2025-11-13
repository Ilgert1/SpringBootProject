package com.example.nobsv2.business.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessImportDTO {
    private String name;
    private String address;
    private String website;
    private String phone;
    private Double rating;
    private Integer total_ratings;  // Match the JSON field name from crawler
    private List<String> types;
    private String place_id;  // Match the JSON field name from crawler
    private String business_status;  // Match the JSON field name from crawler
}