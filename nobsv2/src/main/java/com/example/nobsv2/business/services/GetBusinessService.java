package com.example.nobsv2.business.services;

import com.example.nobsv2.business.model.Business;
import com.example.nobsv2.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetBusinessService {

    private final BusinessRepository businessRepository;

    public Business getBusinessById(Integer id) {
        return businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
    }

    public Business getBusinessByPlaceId(String placeId) {
        return businessRepository.findByPlaceId(placeId)
                .orElseThrow(() -> new RuntimeException("Business not found with placeId: " + placeId));
    }
}