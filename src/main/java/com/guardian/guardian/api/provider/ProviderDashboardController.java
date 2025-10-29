package com.guardian.guardian.api.provider;

import com.guardian.guardian.domain.alarm.dto.AlarmOccurrenceResponse;
import com.guardian.guardian.domain.alarm.dto.AlarmOccurrenceUpdateRequest;
import com.guardian.guardian.domain.alarm.service.AlarmOccurrenceService;
import com.guardian.guardian.domain.emergency.dto.EmergencyAlertAcknowledgeRequest;
import com.guardian.guardian.domain.emergency.dto.EmergencyAlertResponse;
import com.guardian.guardian.domain.emergency.service.EmergencyAlertService;
import com.guardian.guardian.domain.provider.dto.ProviderDashboardResponse;
import com.guardian.guardian.domain.provider.service.ProviderDashboardService;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/provider")
public class ProviderDashboardController {

    private final ProviderDashboardService providerDashboardService;
    private final EmergencyAlertService emergencyAlertService;
    private final AlarmOccurrenceService alarmOccurrenceService;

    public ProviderDashboardController(
            ProviderDashboardService providerDashboardService,
            EmergencyAlertService emergencyAlertService,
            AlarmOccurrenceService alarmOccurrenceService) {
        this.providerDashboardService = providerDashboardService;
        this.emergencyAlertService = emergencyAlertService;
        this.alarmOccurrenceService = alarmOccurrenceService;
    }

    @GetMapping("/{providerId}/dashboard")
    public ResponseEntity<ProviderDashboardResponse> getDashboard(@PathVariable Long providerId) {
        return ResponseEntity.ok(providerDashboardService.getDashboard(providerId));
    }

    @PostMapping("/{providerId}/emergency-alerts/acknowledge")
    public ResponseEntity<EmergencyAlertResponse> acknowledgeAlert(
            @PathVariable Long providerId, @Valid @RequestBody EmergencyAlertAcknowledgeRequest request) {
        return ResponseEntity.ok(emergencyAlertService.acknowledge(request, providerId));
    }

    @GetMapping("/emergency-alerts")
    public ResponseEntity<List<EmergencyAlertResponse>> getAlertsByStatus(
            @RequestParam("status") com.guardian.guardian.domain.emergency.EmergencyAlertStatus status) {
        return ResponseEntity.ok(emergencyAlertService.findByStatus(status));
    }

    @GetMapping("/alarm-occurrences")
    public ResponseEntity<List<AlarmOccurrenceResponse>> getOverdueOccurrences(
            @RequestParam("before")
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime before) {
        return ResponseEntity.ok(alarmOccurrenceService.findOverdue(before));
    }

    @PutMapping("/alarm-occurrences/{occurrenceId}")
    public ResponseEntity<AlarmOccurrenceResponse> updateOccurrence(
            @PathVariable Long occurrenceId, @Valid @RequestBody AlarmOccurrenceUpdateRequest request) {
        return ResponseEntity.ok(alarmOccurrenceService.updateStatus(occurrenceId, request));
    }
}
