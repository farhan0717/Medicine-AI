package com.mediscan.repository;

import com.mediscan.model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    Optional<Medicine> findByBrandNameIgnoreCase(String brandName);
    Optional<Medicine> findByGenericNameIgnoreCase(String genericName);
    List<Medicine> findByBrandNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(String brand, String generic);
}
