package com.guardian.guardian.api.admin;

import com.guardian.guardian.domain.admin.service.AdminDashboardService;
import com.guardian.guardian.domain.notification.entity.Notification;
import com.guardian.guardian.domain.user.UserRole;
import com.guardian.guardian.domain.user.entity.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverview() {
        return ResponseEntity.ok(adminDashboardService.getOverview());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam("keyword") String keyword,
            @RequestParam(value = "role", required = false) UserRole role) {
        return ResponseEntity.ok(adminDashboardService.searchUsers(keyword, role));
    }

    @GetMapping("/medication-adherence")
    public ResponseEntity<Double> getMedicationAdherence(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(adminDashboardService.calculateMedicationAdherence(from, to));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        return ResponseEntity.ok(adminDashboardService.getNotifications());
    }
}
