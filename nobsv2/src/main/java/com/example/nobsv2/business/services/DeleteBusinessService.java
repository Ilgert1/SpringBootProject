package com.example.nobsv2.business.services;

import com.example.nobsv2.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeleteBusinessService {

    private final BusinessRepository businessRepository;

    @Transactional
    public void deleteBusiness(Integer id) {
        if (!businessRepository.existsById(id)) {
            throw new RuntimeException("Business not found with id: " + id);
        }
        businessRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllBusinesses() {
        businessRepository.deleteAll();
    }
}