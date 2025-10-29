package com.guardian.guardian.api.client;

import com.guardian.guardian.domain.alarm.dto.MedicationLogRequest;
import com.guardian.guardian.domain.alarm.dto.MedicationLogResponse;
import com.guardian.guardian.domain.alarm.dto.MedicationPlanRequest;
import com.guardian.guardian.domain.alarm.dto.MedicationPlanResponse;
import com.guardian.guardian.domain.alarm.dto.MedicationPlanUpdateRequest;
import com.guardian.guardian.domain.alarm.service.MedicationLogService;
import com.guardian.guardian.domain.alarm.service.MedicationPlanService;
import com.guardian.guardian.domain.emergency.dto.EmergencyAlertRequest;
import com.guardian.guardian.domain.emergency.dto.EmergencyAlertResponse;
import com.guardian.guardian.domain.emergency.service.EmergencyAlertService;
import com.guardian.guardian.domain.matching.dto.AssignedProviderResponse;
import com.guardian.guardian.domain.profile.dto.ClientProfileResponse;
import com.guardian.guardian.domain.profile.dto.ClientProfileUpdateRequest;
import com.guardian.guardian.domain.profile.service.ClientProfileService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientDashboardController {

    private final ClientProfileService clientProfileService;
    private final MedicationPlanService medicationPlanService;
    private final MedicationLogService medicationLogService;
    private final EmergencyAlertService emergencyAlertService;

    public ClientDashboardController(
            ClientProfileService clientProfileService,
            MedicationPlanService medicationPlanService,
            MedicationLogService medicationLogService,
            EmergencyAlertService emergencyAlertService) {
        this.clientProfileService = clientProfileService;
        this.medicationPlanService = medicationPlanService;
        this.medicationLogService = medicationLogService;
        this.emergencyAlertService = emergencyAlertService;
    }

    @GetMapping("/{clientId}/profile")
    public ResponseEntity<ClientProfileResponse> getProfile(@PathVariable Long clientId) {
        return ResponseEntity.ok(clientProfileService.getProfile(clientId));
    }

    @PutMapping("/{clientId}/profile")
    public ResponseEntity<ClientProfileResponse> updateProfile(
            @PathVariable Long clientId, @Valid @RequestBody ClientProfileUpdateRequest request) {
        return ResponseEntity.ok(clientProfileService.updateProfile(clientId, request));
    }

    @DeleteMapping("/{clientId}/profile")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long clientId) {
        clientProfileService.deleteProfile(clientId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{clientId}/provider")
    public ResponseEntity<AssignedProviderResponse> getAssignedProvider(@PathVariable Long clientId) {
        return ResponseEntity.ok(clientProfileService.getAssignedProvider(clientId));
    }

    @GetMapping("/{clientId}/medication-plans")
    public ResponseEntity<List<MedicationPlanResponse>> getMedicationPlans(@PathVariable Long clientId) {
        return ResponseEntity.ok(medicationPlanService.getPlans(clientId));
    }

    @PostMapping("/{clientId}/medication-plans")
    public ResponseEntity<MedicationPlanResponse> createMedicationPlan(
            @PathVariable Long clientId, @Valid @RequestBody MedicationPlanRequest request) {
        return ResponseEntity.ok(medicationPlanService.createPlan(clientId, request));
    }

    @PutMapping("/{clientId}/medication-plans/{planId}")
    public ResponseEntity<MedicationPlanResponse> updateMedicationPlan(
            @PathVariable Long clientId,
            @PathVariable Long planId,
            @Valid @RequestBody MedicationPlanUpdateRequest request) {
        return ResponseEntity.ok(medicationPlanService.updatePlan(clientId, planId, request));
    }

    @DeleteMapping("/{clientId}/medication-plans/{planId}")
    public ResponseEntity<Void> deleteMedicationPlan(@PathVariable Long clientId, @PathVariable Long planId) {
        medicationPlanService.deletePlan(clientId, planId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{clientId}/medication-logs")
    public ResponseEntity<List<MedicationLogResponse>> getMedicationLogs(
            @PathVariable Long clientId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(medicationLogService.getLogs(clientId, date));
    }

    @PostMapping("/{clientId}/medication-logs")
    public ResponseEntity<MedicationLogResponse> createMedicationLog(
            @PathVariable Long clientId, @Valid @RequestBody MedicationLogRequest request) {
        return ResponseEntity.ok(medicationLogService.record(clientId, request));
    }

    @PutMapping("/medication-logs/{logId}")
    public ResponseEntity<MedicationLogResponse> updateMedicationLog(
            @PathVariable Long logId, @Valid @RequestBody MedicationLogRequest request) {
        return ResponseEntity.ok(medicationLogService.update(logId, request));
    }

    @DeleteMapping("/medication-logs/{logId}")
    public ResponseEntity<Void> deleteMedicationLog(@PathVariable Long logId) {
        medicationLogService.delete(logId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{clientId}/emergency-alerts")
    public ResponseEntity<EmergencyAlertResponse> triggerEmergency(
            @PathVariable Long clientId, @Valid @RequestBody EmergencyAlertRequest request) {
        EmergencyAlertRequest enriched = new EmergencyAlertRequest(
                clientId,
                request.alertType(),
                request.shareLocation(),
                request.latitude(),
                request.longitude(),
                request.alertTime());
        return ResponseEntity.ok(emergencyAlertService.triggerAlert(enriched));
    }

    @GetMapping("/{clientId}/emergency-alerts")
    public ResponseEntity<List<EmergencyAlertResponse>> getEmergencyAlerts(@PathVariable Long clientId) {
        return ResponseEntity.ok(emergencyAlertService.findByClient(clientId));
    }
}
