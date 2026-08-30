package com.mediscan.controller;

import com.mediscan.model.Medicine;
import com.mediscan.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @GetMapping
    public List<Medicine> getAllMedicines(@RequestParam(required = false) String query) {
        if (query != null && !query.trim().isEmpty()) {
            return medicineRepository.findByBrandNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(query, query);
        }
        return medicineRepository.findAll();
    }

    @GetMapping("/search")
    public ResponseEntity<Medicine> searchMedicine(@RequestParam String name) {
        Optional<Medicine> med = medicineRepository.findByBrandNameIgnoreCase(name);
        if (med.isEmpty()) {
            med = medicineRepository.findByGenericNameIgnoreCase(name);
        }
        return med.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
