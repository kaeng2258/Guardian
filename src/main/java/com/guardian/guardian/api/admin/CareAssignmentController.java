package com.guardian.guardian.api.admin;

import com.guardian.guardian.domain.matching.dto.CareAssignmentRequest;
import com.guardian.guardian.domain.matching.dto.CareAssignmentResponse;
import com.guardian.guardian.domain.matching.service.CareAssignmentService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/care-assignments")
public class CareAssignmentController {

    private final CareAssignmentService careAssignmentService;

    public CareAssignmentController(CareAssignmentService careAssignmentService) {
        this.careAssignmentService = careAssignmentService;
    }

    @PostMapping
    public ResponseEntity<CareAssignmentResponse> assign(@Valid @RequestBody CareAssignmentRequest request) {
        return ResponseEntity.ok(careAssignmentService.assign(request));
    }

    @DeleteMapping("/{matchId}")
    public ResponseEntity<Void> unassign(
            @PathVariable Long matchId,
            @RequestParam(value = "endDate", required = false)
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate endDate) {
        careAssignmentService.unassign(matchId, endDate);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<CareAssignmentResponse>> getAssignments(@PathVariable Long clientId) {
        return ResponseEntity.ok(careAssignmentService.findByClient(clientId));
    }
}
