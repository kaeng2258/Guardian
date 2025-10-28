package com.guardian.guardian.api.drug;

import com.guardian.guardian.domain.medicine.entity.Medicine;
import com.guardian.guardian.domain.medicine.service.DrugInfoService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/drug-info")
public class DrugInfoController {

    private final DrugInfoService drugInfoService;

    public DrugInfoController(DrugInfoService drugInfoService) {
        this.drugInfoService = drugInfoService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> search(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(drugInfoService.searchByKeyword(keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicine(@PathVariable Long id) {
        return ResponseEntity.ok(drugInfoService.getMedicine(id));
    }
}
